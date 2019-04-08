const chalk = require('chalk')
const electron = require('electron')
const path = require('path')
const webpack = require('webpack')
const { Nuxt, Builder } = require('nuxt')
const { spawn } = require('child_process')

const mainConfig = require('./webpack.main.config')
const rendererConfig = require('../nuxt.config')
const logs = { electron: 'Electron', main: 'Main Process', renderer: 'Renderer Process' }

let electronProcess = null
let manualRestart = false
let args = ['--inspect=5858', path.join(__dirname, '../dist/electron/main')]

function logStats(proc, data, color, isWebpack = false) {
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

async function startRenderer() {
  rendererConfig.build.quiet = true

  const nuxt = new Nuxt(rendererConfig)

  nuxt.hook('build:before', () => {
    logStats(logs.renderer, 'Preparing project for development\n', 'cyan')
  })

  nuxt.hook('build:compiled', ({ stats }) => {
    logStats(logs.renderer, stats, 'yellow', true)
  })

  nuxt.hook('build:done', () => {
    logStats(logs.renderer, 'Waiting for file changes\n', 'cyan', true)
  })

  await nuxt.server.listen()
  await new Builder(nuxt).build()
}

function startMain() {
  return new Promise(resolve => {
    mainConfig.mode = 'development'

    const compiler = webpack(mainConfig)

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err) // eslint-disable-line
        return
      }

      logStats(logs.main, stats, 'yellow', true)

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

function startElectron() {
  // detect yarn or npm and process commandline args accordingly
  if (process.env.npm_execpath.endsWith('yarn.js')) {
    args = args.concat(process.argv.slice(3))
  } else if (process.env.npm_execpath.endsWith('npm-cli.js')) {
    args = args.concat(process.argv.slice(2))
  }

  electronProcess = spawn(electron, args)

  electronProcess.stdout.on('data', data => {
    logStats(logs.main, data, 'blue')
  })

  electronProcess.stderr.on('data', data => {
    logStats(logs.electron, data, 'red')
  })

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}

async function init() {
  console.log(`  ${chalk.blue.bold('Getting ready for DiraQ desktop')}\n`) // eslint-disable-line

  try {
    await startRenderer()
    await startMain()
    startElectron()
  } catch (err) {
    console.error(err) // eslint-disable-line
  }
}

init()
