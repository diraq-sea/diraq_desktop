const fs = require('fs')

module.exports = dir_path => {
  if (!fs.existsSync(dir_path)) {
    fs.mkdirSync(dir_path)
  }
}
