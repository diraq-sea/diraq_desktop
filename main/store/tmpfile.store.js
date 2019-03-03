const fs = require('fs')
const path = require('path')
const mkdirIfNotExists = require('../utils/mkdirIfNotExists')
const writeFileIfNotExists = require('../utils/writeFileIfNotExists')
const { CONFIG_DIR, TMP_FILE } = require('../const')
let config = []
let isInit = false

function checkInit() {
  if (!isInit) throw new Error('tmpStore is not initialized')
}
module.exports = {
  init() {
    mkdirIfNotExists(CONFIG_DIR)
    writeFileIfNotExists(TMP_FILE, config)
    config = {
      ...config,
      ...JSON.parse(fs.readFileSync(TMP_FILE)),
    }

    isInit = true
  },
  write_file_info(pathinfo) {
    checkInit()
    let filename = path.basename(pathinfo)
    let filedate = fs.statSync(pathinfo).mtime
    let json = JSON.parse(fs.readFileSync(TMP_FILE))
    json.push({ name: filename, data: filedate })
    fs.writeFileSync(TMP_FILE, JSON.stringify(json))
  },
}
