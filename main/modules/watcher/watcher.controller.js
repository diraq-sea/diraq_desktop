const chokidar = require('chokidar')
const watcherService = require('./watcher.service')
const watcherTypes = require('../../../common/watcherTypes')
const mkdirIfNotExists = require('../../utils/mkdirIfNotExists')
const { TEMPS_FILE_DIR } = require('../../const')
var watcher = chokidar.watch('main', {
  //watch対象ディレクトリorファイル
  ignored: /[\/\\]\./, //無視する対象
  persistent: true, //監視を継続するかどうか
})

module.exports = {
  init() {
    mkdirIfNotExists(TEMPS_FILE_DIR)
    Object.values(watcherTypes).forEach(type => {
      watcher.on(type, watcherService(type))
    })
  },
}
