const chokidar = require('chokidar')
const watcherService = require('./main/modules/watcher/watcher.service')
const watcherTypes = require('./common/watcherTypes')
var watcher = chokidar.watch('sample', {
  //watch対象ディレクトリorファイル
  ignored: /[\/\\]\./, //無視する対象
  persistent: true, //監視を継続するかどうか
})

Object.values(watcherTypes).forEach(type => {
  watcher.on(type, watcherService(type))
})
