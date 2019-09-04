import { ipcRenderer } from 'electron'
import { CONFIRM_RESTART, UPDATE_NOTIFICATION } from '~~/common/ipcToWindowTypes'
import { QUIT_AND_INSTALL } from '~~/common/ipcTypes'

export default ({ redirect }, inject) => {
  inject(
    'ipc',
    (type, val) =>
      new Promise((resolve, reject) => {
        ipcRenderer.once(type, (e, { err, val }) => {
          // Todo: err handling
          if (!err) {
            resolve(val)
          } else if (err.status === 401) {
            redirect('/login')
            resolve({})
          } else {
            reject(err)
          }
        })

        ipcRenderer.send(type, val)
      }),
  )

  ipcRenderer.on(UPDATE_NOTIFICATION, (event, message) => {
    alert(message)
  })

  ipcRenderer.on(CONFIRM_RESTART, (event, message) => {
    if (confirm(message)) ipcRenderer.send(QUIT_AND_INSTALL)
  })
}
