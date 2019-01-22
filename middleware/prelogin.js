import { ipcRenderer } from 'electron'
export default function({ redirect, store }) {
  ipcRenderer.send('prelogin-state-request')
  ipcRenderer.once('prelogin-state-reply', (event, arg) => {
    if (arg == 'to user') {
      redirect('/user')
    }
  })
}
