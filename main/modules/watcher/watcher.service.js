const { READY, ADD, ADDDIR, UNLINK, UNLINKDIR, CHANGE, ERROR } = require('./watcherTypes')
const windowStore = require('../../store/window.store')
const { TMPFILE_OBSERVING } = require('../../../common/ipcToWindowTypes')

module.exports = type =>
  ({
    [READY]: () => {
      console.log('監視開始') // eslint-disable-line
    },
    [ADD]: path => {
      const comment_add = `追加ファイル-> ${path}`
      console.log(comment_add) // eslint-disable-line
      windowStore.send(TMPFILE_OBSERVING, comment_add)
    },
    [ADDDIR]: path => {
      const comment_adddir = `追加ディレクトリ-> ${path}`
      console.log(comment_adddir) // eslint-disable-line
      windowStore.send(TMPFILE_OBSERVING, comment_adddir)
    },
    [UNLINK]: path => {
      const comment_unlink = `削除されました-> ${path}`
      console.log(comment_unlink) // eslint-disable-line
      windowStore.send(TMPFILE_OBSERVING, comment_unlink)
    },
    [UNLINKDIR]: path => {
      const comment_unlinkdir = `削除されました-> ${path}`
      console.log(comment_unlinkdir) // eslint-disable-line
      windowStore.send(TMPFILE_OBSERVING, comment_unlinkdir)
    },
    [CHANGE]: path => {
      const comment_change = `修正されました-> ${path}`
      console.log(comment_change) // eslint-disable-line
      windowStore.send(TMPFILE_OBSERVING, comment_change)
    },
    [ERROR]: path => {
      const comment_error = `エラーです-> ${path}`
      console.log(comment_error) // eslint-disable-line
      windowStore.send(TMPFILE_OBSERVING, comment_error)
    },
  }[type])
