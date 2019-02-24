const chokidar = require('chokidar')
const watcherService = require('./main/modules/watcher/watcher.service')
const watcherTypes = require('./common/watcherTypes')
var watcher = chokidar.watch('sample', {
  //watch対象ディレクトリorファイル
  ignored: /[\/\\]\./, //無視する対象
  persistent: true, //監視を継続するかどうか
})
// var type = watcherTypes['CHANGE']
// watcher.on(type, function(path) { console.log("修正されました-> " + path); })
Object.values(watcherTypes).forEach(type => {
  watcher.on(type, watcherService(type))
})
// watcher.on('ready', function() { console.log("監視開始"); })
// .on('add', function(path) { console.log("追加ファイル-> " + path); })
// .on('addDir', function(path) { console.log("追加ディレクトリ-> " + path); })
// .on('unlink', function(path) { console.log("削除されました-> " + path); })
// .on('unlinkDir', function(path) { console.log("削除されました-> " + path); })
// .on('change', function(path) { console.log("修正されました-> " + path); })
// .on('error', function(error) { console.log("エラーです-> " + error); })
