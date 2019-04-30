const { READY, ADD, ADDDIR, UNLINK, UNLINKDIR, CHANGE, ERROR } = require('./watcherTypes')
const windowStore = require('../../store/window.store')
const { TMPFILE_OBSERVING } = require('../../../common/ipcToWindowTypes')
const tmpStore = require('../../store/tmpfile.store')
const { TMPFILE_STATES } = require('../../../common/chokidarTypes')

/* eslint-disable no-console */
module.exports = type =>
  ({
    [READY]: () => {
      console.log('監視開始')
    },
    [ADD]: path => {
      const commentAdd = `追加ファイル-> ${path}`
      console.log(commentAdd)
      windowStore.send(TMPFILE_OBSERVING, commentAdd)
    },
    [ADDDIR]: path => {
      const commentAddDir = `追加ディレクトリ-> ${path}`
      console.log(commentAddDir)
      windowStore.send(TMPFILE_OBSERVING, commentAddDir)
    },
    [UNLINK]: path => {
      const commentUnlink = `削除されました-> ${path}`
      console.log(commentUnlink)
      windowStore.send(TMPFILE_OBSERVING, commentUnlink)
    },
    [UNLINKDIR]: path => {
      const commentUnlinkDir = `削除されました-> ${path}`
      console.log(commentUnlinkDir)
      windowStore.send(TMPFILE_OBSERVING, commentUnlinkDir)
    },
    [CHANGE]: path => {
      const commentChange = `修正されました-> ${path}`
      tmpStore.writeFileInfo(path)
      console.log(commentChange)
      const result = TMPFILE_STATES.CHANGED
      windowStore.send(TMPFILE_OBSERVING, result)
    },
    [ERROR]: path => {
      const commentError = `エラーです-> ${path}`
      console.log(commentError)
      windowStore.send(TMPFILE_OBSERVING, commentError)
    },
  }[type])
/* eslint-enable */
