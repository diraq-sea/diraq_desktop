const {
  READY,
  ADD,
  ADDDIR,
  UNLINK,
  UNLINKDIR,
  CHANGE,
  ERROR,
} = require('../../../common/watcherTypes')
const configStore = require('../../store/config.store')

// module.exports = type =>
//   ({
//     [READY]: () => {
//       console.log('監視開始') // eslint-disable-next-line
//     },
//     [ADD]: path => {
//       console.log('追加ファイル-> ' + path) // eslint-disable-next-line
//     },
//     [ADDDIR]: path => {
//       console.log('追加ディレクトリ-> ' + path) // eslint-disable-next-line
//     },
//     [UNLINK]: path => {
//       console.log('削除されました-> ' + path) // eslint-disable-next-line
//     },
//     [UNLINKDIR]: path => {
//       console.log('削除されました-> ' + path) // eslint-disable-next-line
//     },
//     [CHANGE]: path => {
//       console.log('修正されました-> ' + path) // eslint-disable-next-line
//     },
//     [ERROR]: path => {
//       console.log('エラーです-> ' + path) // eslint-disable-next-line
//     },
//   }[type] || (() => {}))
