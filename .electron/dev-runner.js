const chalk = require('chalk')
const electron = require('electron')
const path = require('path')
const webpack = require('webpack')
const { spawn } = require('child_process')

const mainConfig = require('./webpack.main.config')

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

function startMain() {
  return new Promise(resolve => {
    mainConfig.mode = 'development'

    webpack(mainConfig, (err, stats) => {
      if (err) {
        console.log(err) // eslint-disable-line
        return
      }

      logStats('webpack', stats, 'yellow', true)

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
  args = args.concat(process.argv.slice(2))

  electronProcess = spawn(electron, args)

  electronProcess.stdout.on('data', data => {
    logStats('Main Process', data, 'blue')
  })

  electronProcess.stderr.on('data', data => {
    logStats('Electron', data, 'red')
  })

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}

async function init() {
  console.log(`\n  ${chalk.blue.bold('Getting ready for DiraQ desktop')}\n`) // eslint-disable-line

  startMain()
    .then(() => {
      startElectron()
    })
    .catch(err => {
      console.error(err) // eslint-disable-line
    })
}

init()
