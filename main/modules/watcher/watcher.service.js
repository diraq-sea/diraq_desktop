const {
  READY,
  ADD,
  ADDDIR,
  UNLINK,
  UNLINKDIR,
  CHANGE,
  ERROR,
} = require('../../../common/watcherTypes')

module.exports = (type, mainWindow) =>
  ({
    [READY]: () => {
      let comment_ready = '監視開始'
      mainWindow.webContents.on('did-finish-load', () => {
        console.log(comment_ready) // eslint-disable-line
        mainWindow.webContents.send('tmpfile_observing', comment_ready)
      })
    },
    [ADD]: path => {
      let comment_add = '追加ファイル-> ' + path
      console.log(comment_add) // eslint-disable-line
      mainWindow.webContents.send('tmpfile_observing', comment_add)
    },
    [ADDDIR]: path => {
      let comment_adddir = '追加ディレクトリ-> ' + path
      console.log(comment_adddir) // eslint-disable-line
      mainWindow.webContents.send('tmpfile_observing', comment_adddir)
    },
    [UNLINK]: path => {
      let comment_unlink = '削除されました-> ' + path
      console.log(comment_unlink) // eslint-disable-line
      mainWindow.webContents.send('tmpfile_observing', comment_unlink)
    },
    [UNLINKDIR]: path => {
      let comment_unlinkdir = '削除されました-> ' + path
      console.log(comment_unlinkdir) // eslint-disable-line
      mainWindow.webContents.send('tmpfile_observing', comment_unlinkdir)
    },
    [CHANGE]: path => {
      let comment_change = '修正されました-> ' + path
      console.log(comment_change) // eslint-disable-line
      mainWindow.webContents.send('tmpfile_observing', comment_change)
    },
    [ERROR]: path => {
      let comment_error = 'エラーです-> ' + path
      console.log(comment_error) // eslint-disable-line
      mainWindow.webContents.send('tmpfile_observing', comment_error)
    },
  }[type])
