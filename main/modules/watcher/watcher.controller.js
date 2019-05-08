const chokidar = require('chokidar')
const watcherService = require('./watcher.service')
const watcherTypes = require('./watcherTypes')
const mkdirIfNotExists = require('../../utils/mkdirIfNotExists')
const { TMP_FILES_DIR } = require('../../const')

module.exports = {
  init() {
    mkdirIfNotExists(TMP_FILES_DIR)
    const watcher = chokidar.watch(TMP_FILES_DIR, {
      ignored: /(^~)|(^\.)|(\.tmp)/g,
      persistent: true,
    })
    Object.values(watcherTypes).forEach(type => {
      watcher.on(type, watcherService(type))
    })
  },
}
