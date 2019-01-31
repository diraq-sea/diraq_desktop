const { ipcMain } = require('electron')
const ipcService = require('./ipc.service')
const ipcTypes = require('../../../common/ipcTypes')

module.exports = {
  init() {
    Object.values(ipcTypes).forEach(type => {
      ipcMain.on(type, async (e, arg) => {
        try {
          const val = await ipcService[type](arg)
          e.sender.send(type, { val })
        } catch (err) {
          e.sender.send(type, { err: err.response })
        }
      })
    })
  },
}
