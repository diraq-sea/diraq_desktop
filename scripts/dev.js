import chalk from 'chalk'
import { spawn } from 'child_process'
import electron from 'electron'
import path from 'path'
import webpack from 'webpack'
import { Nuxt, Builder } from 'nuxt'
import mainConfig from '../webpack.config'
import pkg from '../package'
import rendererConfig from '../nuxt.config'
import logs from './logs'

process.env.NODE_ENV = 'development'

const logProcesses = { electron: 'Electron', main: 'Main Process', renderer: 'Renderer Process' }

let electronProcess = null
let manualRestart = false

/**
 * Nuxt.js によるファイルのビルド、開発用サーバーの起動と、ファイルの監視を開始する。
 */
async function startRenderer() {
  rendererConfig.dev = true
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

  await nuxt.ready()
  await nuxt.server.listen()
  process.env._NUXT_URL_ = nuxt.server.listeners[0].url
  await new Builder(nuxt).build()
}

/**
 * webpack による ECMAScript から CommonJS へのトランスコンパイルと、ファイルの監視を開始する。
 * @returns {Promise}
 */
function startMain() {
  return new Promise(resolve => {
    mainConfig.mode = process.env.NODE_ENV
    mainConfig.node = { __dirname: true, __filename: true }

    const compiler = webpack(mainConfig)

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.error(err.stack || err) // eslint-disable-line
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
  electronProcess = spawn(electron, [path.join(process.cwd(), pkg.main)])

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
    console.error(err.stack || err) // eslint-disable-line
    process.exit(1)
  }
}

dev()
