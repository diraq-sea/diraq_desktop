import { ipcRenderer } from 'electron'
export default function({ redirect, store }) {
  ipcRenderer.send('user-state-request')
  ipcRenderer.once('user-state-reply', (event, arg) => {
    if (arg == 'reject') {
      redirect('/login')
    }
  })
}
