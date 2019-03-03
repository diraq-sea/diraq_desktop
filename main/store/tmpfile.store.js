const fs = require('fs')
const path = require('path')
const mkdirIfNotExists = require('../utils/mkdirIfNotExists')
const writeFileIfNotExists = require('../utils/writeFileIfNotExists')
const { CONFIG_DIR, TMP_FILE } = require('../const')
let tmpfiles = []
let isInit = false

function checkInit() {
  if (!isInit) throw new Error('tmpStore is not initialized')
}
module.exports = {
  init() {
    mkdirIfNotExists(CONFIG_DIR)
    writeFileIfNotExists(TMP_FILE, tmpfiles)
    tmpfiles = JSON.parse(fs.readFileSync(TMP_FILE))

    isInit = true
  },
  writeFileInfo(pathinfo) {
    checkInit()

    const jsonlist = JSON.parse(fs.readFileSync(TMP_FILE))
    const filename = path.basename(pathinfo)
    const filedate = fs.statSync(pathinfo).mtime
    if (
      !jsonlist.find(json => {
        return json.name === filename
      })
    ) {
      jsonlist.push({ name: filename, data: filedate })
      fs.writeFileSync(TMP_FILE, JSON.stringify(jsonlist))
    }
  },
}
