const chokidar = require('chokidar')
const watcherService = require('./watcher.service')
const watcherTypes = require('../../../common/watcherTypes')
const mkdirIfNotExists = require('../../utils/mkdirIfNotExists')
const { TMP_FILES_DIR } = require('../../const')
var watcher = chokidar.watch(TMP_FILES_DIR, {
  persistent: true, //監視を継続するかどうか
})

module.exports = {
  init() {
    mkdirIfNotExists(TMP_FILES_DIR)
    Object.values(watcherTypes).forEach(type => {
      watcher.on(type, watcherService(type))
    })
  },
}
