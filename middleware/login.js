import { ipcRenderer } from 'electron'
export default function({ redirect, store }) {
  ipcRenderer.send('login-state-request')
  ipcRenderer.once('login-state-reply', (event, arg) => {
    if (arg == 'already login') {
      redirect('/user')
    } else if (arg == 'need prelogin') {
      redirect('/')
    }
  })
}
