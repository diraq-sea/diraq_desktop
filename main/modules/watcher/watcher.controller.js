const chokidar = require('chokidar')
const watcherService = require('./watcher.service')
const watcherTypes = require('../../../common/watcherTypes')
var watcher = chokidar.watch('main', {
  //watch対象ディレクトリorファイル
  ignored: /[\/\\]\./, //無視する対象
  persistent: true, //監視を継続するかどうか
})

module.exports = {
  init() {
    Object.values(watcherTypes).forEach(type => {
      watcher.on(type, watcherService(type))
    })
  },
}
