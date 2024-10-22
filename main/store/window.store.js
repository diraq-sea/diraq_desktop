const { BrowserWindow } = require('electron')
const { WINDOW_ORIGIN } = require('../const')
const { ON_MAXIMIZE, ON_UNMAXIMIZE } = require('../../common/ipcToWindowTypes')
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
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
    },
  })

  if (process.env.NODE_ENV === 'development') {
    const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
    await installExtension(VUEJS_DEVTOOLS)
    mainWindow.webContents.openDevTools()
  }

  mainWindow.focus()
  mainWindow.loadURL(WINDOW_ORIGIN)

  mainWindow.on('resize', () => {
    const [width, height] = mainWindow.getSize()
    configStore.set('windowSize', { width, height })
  })

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send(ON_MAXIMIZE)
  })

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send(ON_UNMAXIMIZE)
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
  unmaximize() {
    checkInit()
    mainWindow.unmaximize()
  },
  minimize() {
    checkInit()
    mainWindow.minimize()
  },
}
