const { BrowserWindow } = require('electron')
const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
const { WINDOW_ORIGIN } = require('../const')
const configStore = require('./config.store')

let mainWindow = null

function checkInit() {
  if (!mainWindow) throw new Error('windowStore is not initialized')
}

async function init() {
  const { width, height } = configStore.get('windowSize')

  mainWindow = new BrowserWindow({
    width,
    height,
    frame: false,
    titleBarStyle: 'hidden',
  })

  mainWindow.setAlwaysOnTop(true)
  mainWindow.setAlwaysOnTop(false)

  await installExtension(VUEJS_DEVTOOLS)
  mainWindow.loadURL(WINDOW_ORIGIN)
  mainWindow.webContents.openDevTools()

  mainWindow.on('resize', () => {
    const [width, height] = mainWindow.getSize()
    configStore.set('windowSize', { width, height })
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

module.exports = {
  init,
  async restore() {
    if (!mainWindow) await init()
  },
  send(type, value) {
    // chokidarのためにcheckInit使わない
    if (mainWindow) mainWindow.webContents.send(type, value)
  },
  close() {
    checkInit()
    mainWindow.close()
  },
  maximize() {
    checkInit()
    mainWindow.maximize()
  },
  minimize() {
    checkInit()
    mainWindow.minimize()
  },
}
