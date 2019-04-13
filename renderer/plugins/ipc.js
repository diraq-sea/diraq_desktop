import { ipcRenderer } from 'electron'

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
}
