import { app } from 'electron'
import log from 'electron-log'
import { autoUpdater } from 'electron-updater'
import { send } from '~/store/window.store'
import { CONFIRM_RESTART, UPDATE_NOTIFICATION } from '~~/common/ipcToWindowTypes'

autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'

function sendStatusToWindow(text) {
  log.info(text)
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...')
})

autoUpdater.on('update-available', info => {
  sendStatusToWindow('Update available.')
  send(UPDATE_NOTIFICATION, '最新バージョンをダウンロードします。')
})

autoUpdater.on('update-not-available', info => {
  sendStatusToWindow('Update not available.')
})

autoUpdater.on('error', err => {
  sendStatusToWindow('Error in auto-updater. ' + err)
})

autoUpdater.on('download-progress', progressObj => {
  let logMessage = 'Download speed: ' + progressObj.bytesPerSecond
  logMessage = logMessage + ' - Downloaded ' + progressObj.percent + '%'
  logMessage = logMessage + ' (' + progressObj.transferred + '/' + progressObj.total + ')'
  sendStatusToWindow(logMessage)
})

autoUpdater.on('update-downloaded', info => {
  sendStatusToWindow('Update downloaded')
  send(CONFIRM_RESTART, '今すぐ再起動して更新しますか？')
})

app.on('ready', () => {
  autoUpdater.checkForUpdatesAndNotify()
})
