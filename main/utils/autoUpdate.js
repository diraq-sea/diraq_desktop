import { app } from 'electron'
import log from 'electron-log'
import { autoUpdater } from 'electron-updater'

autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'
log.info('App starting...')

function sendStatusToWindow(text) {
  log.info(text)
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...')
})

autoUpdater.on('update-available', info => {
  sendStatusToWindow('Update available.')
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
})

app.on('ready', () => {
  autoUpdater.checkForUpdatesAndNotify()
})
