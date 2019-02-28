const { BrowserWindow } = require('electron')
const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
const { WINDOW_ORIGIN } = require('../const')
const configStore = require('./config.store')

let mainWindow = null

async function init() {
  const { width, height } = configStore.get('windowSize')

  mainWindow = new BrowserWindow({
    width,
    height,
    frame: false,
  })

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
}
