const {
  READY,
  ADD,
  ADDDIR,
  UNLINK,
  UNLINKDIR,
  CHANGE,
  ERROR,
} = require('../../../common/watcherTypes')

module.exports = type =>
  ({
    [READY]: () => {
      console.log('監視開始') // eslint-disable-line
    },
    [ADD]: path => {
      console.log('追加ファイル-> ' + path) // eslint-disable-line
    },
    [ADDDIR]: path => {
      console.log('追加ディレクトリ-> ' + path) // eslint-disable-line
    },
    [UNLINK]: path => {
      console.log('削除されました-> ' + path) // eslint-disable-line
    },
    [UNLINKDIR]: path => {
      console.log('削除されました-> ' + path) // eslint-disable-line
    },
    [CHANGE]: path => {
      console.log('修正されました-> ' + path) // eslint-disable-line
    },
    [ERROR]: path => {
      console.log('エラーです-> ' + path) // eslint-disable-line
    },
  }[type])
