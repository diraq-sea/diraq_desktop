const fs = require('fs')
const writeFileIfNotExists = require('../utils/writeFileIfNotExists')
const { COMMIT_FILE } = require('../const')
const corrStore = require('../store/corr.store')
const commitfile = []
let isInit = false

function checkInit() {
  if (!isInit) throw new Error('tmpStore is not initialized')
}
module.exports = {
  init() {
    writeFileIfNotExists(COMMIT_FILE, commitfile)
    isInit = true
  },
  writeInfo({ commitpanel, fileId, commitId }) {
    checkInit()
    const commitlist = JSON.parse(fs.readFileSync(COMMIT_FILE))
    const newcommitlist = { fileId, commitId }
    const partcommitlist = commitlist.filter(obj => obj.fileId === fileId)
    const filename = corrStore.hashToFilename(commitId)
    let result = ''
    if (partcommitlist[0] === undefined) {
      console.log('最初のcommit') // eslint-disable-line
      commitlist.push(newcommitlist)
      fs.writeFileSync(COMMIT_FILE, JSON.stringify(commitlist))
      result = 'initialCommit'
    } else if (commitpanel) {
      console.log('編集不可commitしてから') // eslint-disable-line
      result = 'mustCommit'
    } else if (filename === undefined) {
      console.log('別file開く') // eslint-disable-line
      const numberInCommit = commitlist.findIndex(obj => obj.fileId === fileId)
      commitlist.splice(numberInCommit, 1)
      commitlist.push(newcommitlist)
      fs.writeFileSync(COMMIT_FILE, JSON.stringify(commitlist))
      result = 'anotherFileCommit'
    } else {
      const numberInCommit = commitlist.findIndex(obj => obj.fileId === fileId)
      commitlist.splice(numberInCommit, 1)
      commitlist.push(newcommitlist)
      fs.writeFileSync(COMMIT_FILE, JSON.stringify(commitlist))
      result = commitId
    }
    return result
  },
  readInfo(fileId) {
    checkInit()
    const commitlist = JSON.parse(fs.readFileSync(COMMIT_FILE))
    const partcommitlist = commitlist.filter(obj => obj.fileId === fileId)
    return partcommitlist[0].commitId
  },
}
