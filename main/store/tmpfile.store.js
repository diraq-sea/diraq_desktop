const fs = require('fs')
const path = require('path')
const mkdirIfNotExists = require('../utils/mkdirIfNotExists')
const writeFileIfNotExists = require('../utils/writeFileIfNotExists')
const { CONFIG_DIR, TMP_FILE, COMMIT_FILE, AUTH_FILE } = require('../const')
const crypto = require('crypto')
let tmpfiles = []
let isInit = false

function checkInit() {
  if (!isInit) throw new Error('tmpStore is not initialized')
}

const confirmFileLimit = date => Date.now() - Date.parse(date) < 1000000

module.exports = {
  init() {
    mkdirIfNotExists(CONFIG_DIR)
    writeFileIfNotExists(TMP_FILE, tmpfiles)
    writeFileIfNotExists(COMMIT_FILE)
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

  saveFile(path) {
    const shasum = crypto.createHash('sha1')
    const parenthash = ''
    const { basename, mtime } = fs.statSync(path)
    const email = JSON.parse(fs.readFileSync(AUTH_FILE)).email
    const comment = 'sample comment'
    const filedata = fs.readFileSync(path).toString('hex')
    const commitfile = {
      parent: parenthash,
      filename: basename,
      committime: mtime,
      data: filedata,
      email: email,
      comment: comment,
    }
    fs.writeFileSync(COMMIT_FILE, JSON.stringify(commitfile))
    const data = fs.readFileSync(COMMIT_FILE, 'utf8')
    const hashname = shasum.update(data).digest('hex')
    console.log(hashname)  //eslint-disable-line
  },
}
