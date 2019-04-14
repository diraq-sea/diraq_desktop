const fs = require('fs')
const path = require('path')
const writeFileIfNotExists = require('../utils/writeFileIfNotExists')
const { TMP_FILE } = require('../const')
let tmpfiles = []
let isInit = false

function checkInit() {
  if (!isInit) throw new Error('tmpStore is not initialized')
}

const confirmFileLimit = date => Date.now() - Date.parse(date) < 1000000

module.exports = {
  init() {
    writeFileIfNotExists(TMP_FILE, tmpfiles)
    tmpfiles = JSON.parse(fs.readFileSync(TMP_FILE))

    isInit = true
  },
  writeFileInfo(pathinfo) {
    checkInit()

    const jsonlist = JSON.parse(fs.readFileSync(TMP_FILE))
    const filename = path.basename(pathinfo)
    const { birthtime, mtime } = fs.statSync(pathinfo)
    const targetfile = jsonlist.find(json => json.name === filename)
    if (!targetfile) {
      jsonlist.push({ name: filename, birthdate: birthtime, mdate: mtime })
    } else if (confirmFileLimit(targetfile.mdate)) {
      targetfile.birthdate = birthtime
    } else {
      targetfile.mdate = null
    }
    const jsonlist2 = jsonlist.filter(obj => obj.mdate !== null)
    fs.writeFileSync(TMP_FILE, JSON.stringify(jsonlist2))
  },
  readFileInfo() {
    return JSON.parse(fs.readFileSync(TMP_FILE))
  },
}
