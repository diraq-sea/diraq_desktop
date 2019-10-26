const { app } = require('electron')
const configStore = require('./store/config.store')
const authStore = require('./store/auth.store')
const tmpStore = require('./store/tmpfile.store')
const windowStore = require('./store/window.store')
const watcherController = require('./modules/watcher/watcher.controller')
const commitStore = require('./store/commit.store')
const corrStore = require('./store/corr.store')
const ngrok = require('./store/ngrok')
const mkdirIfNotExists = require('./utils/mkdirIfNotExists')
const autoDelete = require('./utils/autoDelete')
const { CONFIG_DIR, MOCK_ENABLED } = require('./const')
const { setupAxiosMock } = require('./utils/axios')

require('./utils/autoUpdate')

mkdirIfNotExists(CONFIG_DIR)

// ipcServiceのaxios-mockがCONFIG_DIRを必要とするので注意
const ipcController = require('./modules/ipc/ipc.controller')

async function createWindow() {
  if (MOCK_ENABLED) await setupAxiosMock()
  configStore.init()
  authStore.init()
  tmpStore.init()
  await windowStore.init()

  ipcController.init()
  watcherController.init()
  commitStore.init()
  corrStore.init()
  ngrok.init()
  autoDelete()
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
