const writeFileIfNotExists = require('../utils/writeFileIfNotExists')
const { COMMIT_FILE } = require('../const')
const fs = require('fs')
let commitfile = []
let isInit = false

function checkInit() {
  if (!isInit) throw new Error('tmpStore is not initialized')
}
module.exports = {
  init() {
    writeFileIfNotExists(COMMIT_FILE, commitfile)
    isInit = true
  },
  writeInfo({ fileId, commitId }) {
    checkInit()
    const commitlist = JSON.parse(fs.readFileSync(COMMIT_FILE))
    const newcommitlist = { fileId, commitId }
    const partcommitlist = commitlist.filter(obj => obj.fileId === fileId)
    if (partcommitlist[0] === undefined) {
      console.log('最初のcommit') // eslint-disable-line
      commitlist.push(newcommitlist)
      fs.writeFileSync(COMMIT_FILE, JSON.stringify(commitlist))
    } else if (partcommitlist[0].fileId === fileId) {
      console.log('編集不可commitしてから') // eslint-disable-line
    } else {
      console.log('可能') // eslint-disable-line
      commitlist.push(newcommitlist)
      fs.writeFileSync(COMMIT_FILE, JSON.stringify(commitlist))
    }
  },
  readInfo(fileId) {
    checkInit()
    const commitlist = JSON.parse(fs.readFileSync(COMMIT_FILE))
    const partcommitlist = commitlist.filter(obj => obj.fileId === fileId)
    return partcommitlist[0].commitId
  },
}
