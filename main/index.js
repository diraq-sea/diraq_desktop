const { app } = require('electron')
const configStore = require('./store/config.store')
const authStore = require('./store/auth.store')
const tmpStore = require('./store/tmpfile.store')
const windowStore = require('./store/window.store')
const ipcController = require('./modules/ipc/ipc.controller')
const watcherController = require('./modules/watcher/watcher.controller')

async function createWindow() {
  configStore.init()
  authStore.init()
  tmpStore.init()
  await windowStore.init()

  ipcController.init()
  watcherController.init()
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// On macOS it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on('activate', windowStore.restore)
