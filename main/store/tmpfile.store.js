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

function compareFileDate(date1, date2) {
  if (Date.parse(date1) - Date.parse(date2) > 10000) {
    return true
  }
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
    const { birthtime, mtime } = fs.statSync(pathinfo)
    const currentdate = new Date().toISOString()
    const targetfile = jsonlist.find(json => json.name === filename)
    if (!targetfile) {
      jsonlist.push({ name: filename, birthdate: birthtime, mdate: mtime })
    } else if (!compareFileDate(currentdate, targetfile.birthdate)) {
      targetfile.birthdate = birthtime
      targetfile.mdate = mtime
    } else {
      targetfile.mdate = null
    }
    const jsonlist2 = jsonlist.filter(obj => obj.mdate !== null)
    fs.writeFileSync(TMP_FILE, JSON.stringify(jsonlist2))
  },
}
