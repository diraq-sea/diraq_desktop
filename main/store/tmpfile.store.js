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
    const filebirthdate = fs.statSync(pathinfo).birthtime
    const filemdate = fs.statSync(pathinfo).mtime
    const targetfile = jsonlist.find(json => {
      if (json.name === filename) {
        return json
      } else {
        return null
      }
    })
    if (targetfile) {
      for (let json in jsonlist) {
        if (jsonlist[json].name === filename) {
          jsonlist[json].birthdate = filebirthdate
          jsonlist[json].mdate = filemdate
        }
      }
    } else {
      jsonlist.push({ name: filename, birthdate: filebirthdate, mdate: filemdate })
    }
    fs.writeFileSync(TMP_FILE, JSON.stringify(jsonlist))
  },
}
