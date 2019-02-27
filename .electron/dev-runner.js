const electron = require('electron')
const path = require('path')
const webpack = require('webpack')
const { spawn } = require('child_process')

const mainConfig = require('./webpack.main.config')

let electronProcess = null
let manualRestart = false
let args = ['--inspect=5858', path.join(__dirname, '../dist/electron/main.js')]

function startMain() {
  return new Promise(resolve => {
    mainConfig.mode = 'development'
    const compiler = webpack(mainConfig)

    compiler.watch({}, err => {
      if (err) {
        console.log(err)
        return
      }

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
    electronLog(data)
  })
  electronProcess.stderr.on('data', data => {
    electronLog(data)
  })

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}

function electronLog(data) {
  let log = ''
  data = data.toString().split(/\r?\n/)
  data.forEach(line => {
    log += `  ${line}\n`
  })
  if (/[0-9A-z]+/.test(log)) {
    console.log(log)
  }
}

function init() {
  startMain()
    .then(() => {
      startElectron()
    })
    .catch(err => {
      console.error(err)
    })
}

init()
