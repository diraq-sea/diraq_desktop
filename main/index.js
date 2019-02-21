const { app, BrowserWindow } = require('electron')
const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
const { WINDOW_ORIGIN } = require('./const')
const configStore = require('./store/config.store')
const authStore = require('./store/auth.store')
const ipcController = require('./modules/ipc/ipc.controller')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  configStore.init()
  authStore.init()
  ipcController.init()

  const { width, height } = configStore.get('windowSize')

  mainWindow = new BrowserWindow({ width, height })

  mainWindow.loadURL(WINDOW_ORIGIN)
  mainWindow.webContents.openDevTools()
  installExtension(VUEJS_DEVTOOLS)

  mainWindow.on('resize', () => {
    const [width, height] = mainWindow.getSize()
    configStore.set('windowSize', { width, height })
  })

  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

app.on('window-all-closed', function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
