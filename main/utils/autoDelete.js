const fs = require('fs')
const path = require('path')
const corrStore = require('../store/corr.store')
const { TMP_FILES_DIR } = require('../const')

module.exports = () => {
  const filenames = fs.readdirSync(TMP_FILES_DIR)
  for (const filename of filenames) {
    if (
      Date.now() - fs.statSync(path.join(TMP_FILES_DIR, filename)).mtime.getTime() >
      30 * 24 * 60 * 60 * 1000
    ) {
      try {
        fs.unlinkSync(path.join(TMP_FILES_DIR, filename))
        corrStore.deleteFileInfo(path.parse(filename).name)
      } catch (error) {}
    }
  }
}
