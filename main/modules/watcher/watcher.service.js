const path = require('path')
const windowStore = require('../../store/window.store')
const { TMPFILE_OBSERVING } = require('../../../common/ipcToWindowTypes')
const tmpStore = require('../../store/tmpfile.store')
const corrStore = require('../../store/corr.store')
const { TMPFILE_STATES } = require('../../../common/chokidarTypes')
const { READY, ADD, ADDDIR, UNLINK, UNLINKDIR, CHANGE, ERROR } = require('./watcherTypes')

/* eslint-disable no-console */
module.exports = type =>
  ({
    [READY]: () => {
      console.log('監視開始')
    },
    [ADD]: pathname => {
      const commentAdd = `追加ファイル-> ${pathname}`
      console.log(commentAdd)
      windowStore.send(TMPFILE_OBSERVING, commentAdd)
    },
    [ADDDIR]: pathname => {
      const commentAddDir = `追加ディレクトリ-> ${pathname}`
      console.log(commentAddDir)
      windowStore.send(TMPFILE_OBSERVING, commentAddDir)
    },
    [UNLINK]: pathname => {
      const commentUnlink = `削除されました-> ${pathname}`
      console.log(commentUnlink)
      corrStore.deleteFileInfo(path.parse(pathname).name)
      windowStore.send(TMPFILE_OBSERVING, commentUnlink)
    },
    [UNLINKDIR]: pathname => {
      const commentUnlinkDir = `削除されました-> ${pathname}`
      console.log(commentUnlinkDir)
      windowStore.send(TMPFILE_OBSERVING, commentUnlinkDir)
    },
    [CHANGE]: pathname => {
      const commentChange = `修正されました-> ${pathname}`
      tmpStore.writeFileInfo(pathname)
      console.log(commentChange)
      windowStore.send(TMPFILE_OBSERVING, TMPFILE_STATES.CHANGED)
    },
    [ERROR]: pathname => {
      const commentError = `エラーです-> ${pathname}`
      console.log(commentError)
      windowStore.send(TMPFILE_OBSERVING, commentError)
    },
  }[type])
/* eslint-enable */
