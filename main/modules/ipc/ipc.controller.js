const { ipcMain } = require('electron')
const ipcTypes = require('../../../common/ipcTypes')
const ipcService = require('./ipc.service')

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
