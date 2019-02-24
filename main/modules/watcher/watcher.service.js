// const {
//   READY,
//   ADD,
//   ADDDIR,
//   UNLINK,
//   UNLINKDIR,
//   CHANGE,
//   ERROR,
// } = require('../../../common/watcherTypes')
// const configStore = require('../../store/config.store')

// module.exports = type =>
//   ({
//     [READY]: () => {
//       console.log('監視開始') // eslint-disable-next-line
//   },
//     [ADD]: path => {
//       // eslint-disable-next-line
//     console.log("修正されました-> " + path)
//     },
//     [CHANGE]: path => {
//       // eslint-disable-next-line
//     console.log("修正されました-> " + path)
//     },
//     [CHANGE]: path => {
//       // eslint-disable-next-line
//     console.log("修正されました-> " + path)
//     },
//     [CHANGE]: path => {
//       // eslint-disable-next-line
//     console.log("修正されました-> " + path)
//     },
//   }[type] || (() => {}))
