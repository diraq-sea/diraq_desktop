const fs = require('fs')
const writeFileIfNotExists = require('../utils/writeFileIfNotExists')
const { MOCK_FILE } = require('../const')
let mock = null

function save() {
  fs.writeFileSync(MOCK_FILE, JSON.stringify(mock))
}

module.exports = {
  init() {
    writeFileIfNotExists(MOCK_FILE, {})
    mock = JSON.parse(fs.readFileSync(MOCK_FILE))
  },
  get: key => mock[key],
  set(key, val) {
    mock[key] = val
    save()
  },
}
