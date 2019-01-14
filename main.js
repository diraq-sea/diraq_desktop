// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const homedir = process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME']
const diraq_study_dir_path = path.join(homedir, '.diraq_study')
const diraq_study_file_path = path.join(diraq_study_dir_path, 'auth.json')
const content = {
  _: "This is your DiraQ credentials file. DON'T SHARE!",
  credentials: [
    {
      type: 'login',
      token: '',
    },
  ],
}
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000/')

  //create new directory for login
  createfile_login()
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

function createfile_login() {
  if (!fs.existsSync(diraq_study_dir_path)) {
    fs.mkdirSync(diraq_study_dir_path)
    fs.writeFileSync(diraq_study_file_path, JSON.stringify(content))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('prelogin', async (event, arg) => {
  await axios.post('http://localhost:8080/v1/auth/prelogin', { email: arg })
})

ipcMain.on('login', async (event, arg) => {
  const {
    data: { token },
  } = await axios.post('http://localhost:8080/v1/auth/login', null, {
    headers: { Authorization: `Bearer ${arg}` },
  })
  content.credentials[0].token = token
  fs.writeFileSync(diraq_study_file_path, JSON.stringify(content))
  const {
    data: { name },
  } = await axios.get('http://localhost:8080/v1/users', {
    headers: { Authorization: `Bearer ${token}` },
  })
  event.sender.send('reply_login', name)
  //console.log(name)
})
