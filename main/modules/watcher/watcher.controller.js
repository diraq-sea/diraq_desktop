const chokidar = require('chokidar')
const watcherService = require('./watcher.service')
const watcherTypes = require('./watcherTypes')
const mkdirIfNotExists = require('../../utils/mkdirIfNotExists')
const { TMP_FILES_DIR } = require('../../const')

module.exports = {
  init() {
    mkdirIfNotExists(TMP_FILES_DIR)
    const watcher = chokidar.watch(TMP_FILES_DIR, {
      ignored: /(^|[\\])\../,
      persistent: true, // 監視を継続するかどうか
    })
    Object.values(watcherTypes).forEach(type => {
      watcher.on(type, watcherService(type))
    })
  },
}
