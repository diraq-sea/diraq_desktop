// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const homedir = process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME']
const diraq_study_dir_path = path.join(homedir, '.diraq_study')
const diraq_study_file_path = path.join(diraq_study_dir_path, 'auth.json')
let initial_url = 'http://localhost:3000/login'
const content = {
  _: "This is your DiraQ credentials file. DON'T SHARE!",
  credentials: [
    {
      type: 'login',
      token: '',
    },
  ],
}
const auth_file = read_auth_json()
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

async function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 })
  if (!auth_file) {
    initial_url = 'http://localhost:3000/'
  }
  // and load the index.html of the app or redirect to user-page
  mainWindow.loadURL(initial_url)
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
function read_auth_json() {
  if (fs.existsSync(diraq_study_file_path)) {
    return JSON.parse(fs.readFileSync(diraq_study_file_path))
  } else {
    return null
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

//login,logout
ipcMain.on('prelogin', async (event, arg) => {
  createfile_login() //create new directory for login
  await axios.post('http://localhost:8080/v1/auth/prelogin', { email: arg })
  event.sender.send('prelogin-reply')
})

ipcMain.on('login', async (event, arg) => {
  const {
    data: { token },
  } = await axios.post('http://localhost:8080/v1/auth/login', null, {
    headers: { Authorization: `Bearer ${arg}` },
  })
  content.credentials[0].token = token
  fs.writeFileSync(diraq_study_file_path, JSON.stringify(content))
  event.sender.send('login-reply')
})

ipcMain.on('user-name-request', async (event, arg) => {
  let resdat
  if (auth_file && auth_file.credentials[0].token) {
    const {
      data: { name },
    } = await axios.get('http://localhost:8080/v1/users', {
      headers: { Authorization: `Bearer ${auth_file.credentials[0].token}` },
    })
    resdat = name
  } else {
    resdat = null
  }
  event.sender.send('user-name-reply', resdat)
})

ipcMain.on('logout', async () => {
  content.credentials[0].token = ''
  fs.writeFileSync(diraq_study_file_path, JSON.stringify(content))
})

//middleware ipc

ipcMain.on('login-state-request', async (event, arg) => {
  const auth_file = read_auth_json()
  if (auth_file && auth_file.credentials[0].token) {
    event.sender.send('login-state-reply', 'already login')
  } else if (!auth_file) {
    event.sender.send('login-state-reply', 'need prelogin')
  }
})

ipcMain.on('prelogin-state-request', async (event, arg) => {
  const auth_file_token = read_auth_json().credentials[0].token
  if (auth_file_token && auth_file_token != '') {
    event.sender.send('prelogin-state-reply', 'to user')
  }
})

ipcMain.on('user-state-request', async (event, arg) => {
  const auth_file_token = read_auth_json().credentials[0].token
  if (!auth_file_token) {
    event.sender.send('user-state-reply', 'reject')
  }
})
