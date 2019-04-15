const chalk = require('chalk')
const electron = require('electron')
const path = require('path')
const webpack = require('webpack')
const { Nuxt, Builder } = require('nuxt')
const { spawn } = require('child_process')

const mainConfig = require('./webpack.config')
const rendererConfig = require('./nuxt.config')
const logProcesses = { electron: 'Electron', main: 'Main Process', renderer: 'Renderer Process' }

let electronProcess = null
let manualRestart = false
let args = ['--inspect=5858', path.join(__dirname, './dist/main')]

/**
 * 標準出力、標準エラー出力をブロックにまとめて表示する。
 * @param {string} proc ブロックの見出しとして表示する文字列
 * @param {any} data コンソールに表示するデータ
 * @param {string} color 見出し、枠線に適用する文字色
 * @param {boolean} [isWebpack=false] データが webpack の Stats Object か否かのフラグ
 */
function logs(proc, data, color, isWebpack = false) {
  let log = ''
  log += `${chalk[color].bold(`┏ ${proc} ${[...Array(27 - proc.length)].join('-')}`)}\n\n`

  if (typeof data === 'object' && isWebpack) {
    data
      .toString({
        colors: true,
        chunks: false,
      })
      .split(/\r?\n/)
      .forEach(line => {
        log += `  ${line}\n`
      })
    log += '\n'
  } else if (typeof data === 'object') {
    data
      .toString()
      .split(/\r?\n/)
      .forEach(line => {
        log += `  ${line}\n`
      })
  } else {
    log += `  ${data}\n`
  }

  log += `${chalk[color].bold(`┗ ${[...Array(28)].join('-')}`)}\n`
  console.log(log) // eslint-disable-line
}

/**
 * Nuxt.js によるファイルのビルド、開発用サーバーの起動と、ファイルの監視を開始する。
 */
async function startRenderer() {
  rendererConfig.build.quiet = true

  const nuxt = new Nuxt(rendererConfig)

  nuxt.hook('build:before', () => {
    logs(logProcesses.renderer, 'Preparing project for development\n', 'cyan')
  })

  nuxt.hook('build:compiled', ({ stats }) => {
    logs(logProcesses.renderer, stats, 'yellow', true)
  })

  nuxt.hook('build:done', () => {
    logs(logProcesses.renderer, 'Waiting for file changes\n', 'cyan', true)
  })

  await nuxt.server.listen()
  await new Builder(nuxt).build()
}

/**
 * webpack による ECMAScript から CommonJS へのトランスコンパイルと、ファイルの監視を開始する。
 * @returns {Promise}
 */
function startMain() {
  return new Promise(resolve => {
    const compiler = webpack(mainConfig)

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err) // eslint-disable-line
        return
      }

      logs(logProcesses.main, stats, 'yellow', true)

      if (electronProcess && electronProcess.kill) {
        manualRestart = true
        process.kill(electronProcess.pid)
        electronProcess = null
        startElectron()

        setTimeout(() => {
          manualRestart = false
        }, 5000)
      }

      resolve()
    })
  })
}

/**
 * Electron を起動する。
 */
function startElectron() {
  // detect yarn or npm and process commandline args accordingly
  if (process.env.npm_execpath.endsWith('yarn.js')) {
    args = args.concat(process.argv.slice(3))
  } else if (process.env.npm_execpath.endsWith('npm-cli.js')) {
    args = args.concat(process.argv.slice(2))
  }

  electronProcess = spawn(electron, args)

  electronProcess.stdout.on('data', data => {
    logs(logProcesses.main, data, 'blue')
  })

  electronProcess.stderr.on('data', data => {
    logs(logProcesses.electron, data, 'red')
  })

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}

/**
 * 開発用のスクリプトを実行する。
 * 1. レンダラープロセスとして Nuxt.js の処理を実行
 *    ファイルのビルド、開発用サーバーの起動、ファイルの変更監視
 * 2. メインプロセスとして webpack の処理を実行
 *    ファイルのトランスコンパイル、ファイルの変更監視
 * 3. Electron の起動
 */
async function dev() {
  console.log(`  ${chalk.blue.bold('Getting ready for DiraQ desktop')}\n`) // eslint-disable-line

  try {
    await startRenderer()
    await startMain()
    startElectron()
  } catch (err) {
    console.error(err) // eslint-disable-line
  }
}

dev()
