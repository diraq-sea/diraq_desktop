const fs = require('fs')
const writeFileIfNotExists = require('../utils/writeFileIfNotExists')
const { CORR_FILE } = require('../const')
const corrfile = []
let isInit = false

function checkInit() {
  if (!isInit) throw new Error('tmpStore is not initialized')
}

module.exports = {
  init() {
    writeFileIfNotExists(CORR_FILE, corrfile)
    isInit = true
    return JSON.parse(fs.readFileSync(CORR_FILE))
  },
  writeFileInfo(filename, hashname) {
    checkInit()
    const corrlist = JSON.parse(fs.readFileSync(CORR_FILE))
    const newcorrlist = { filename, hashname }
    corrlist.push(newcorrlist)
    fs.writeFileSync(CORR_FILE, JSON.stringify(corrlist)) // corr.jsonは一定時間たったら、tmp fileの fileが消える時に連動させて消す
  },
  replaceFileInfo(commitId, newcommitId) {
    checkInit()
    const corrlist = JSON.parse(fs.readFileSync(CORR_FILE))
    const replaceId = corrlist.findIndex(corr => corr.hashname === commitId)
    if (replaceId >= 0) {
      corrlist[replaceId].hashname = newcommitId
      fs.writeFileSync(CORR_FILE, JSON.stringify(corrlist))
    }
  },
  deleteFileInfo(filename) {
    checkInit()
    const corrlist = JSON.parse(fs.readFileSync(CORR_FILE))
    const deleteId = corrlist.findIndex(corr => corr.filename === filename)
    if (deleteId >= 0) {
      corrlist.splice(deleteId, 1)
      fs.writeFileSync(CORR_FILE, JSON.stringify(corrlist))
    }
  },
  hashToFilename(commitId) {
    checkInit()
    const corrlist = JSON.parse(fs.readFileSync(CORR_FILE))
    const judgeId = corrlist.findIndex(corr => corr.hashname === commitId)
    if (judgeId >= 0) {
      return corrlist[judgeId].filename
    }
    const filename = `${Date.now()}_${commitId}`
    this.writeFileInfo(filename, commitId)
    return filename
  },
  filenameToHash(name) {
    checkInit()
    const corrlist = JSON.parse(fs.readFileSync(CORR_FILE))
    const judgeId = corrlist.findIndex(corr => corr.filename === name)
    if (judgeId >= 0) {
      return corrlist[judgeId].hashname
    }
    return undefined
  },
}
