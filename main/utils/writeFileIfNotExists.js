const fs = require('fs')

module.exports = (file_path, content) => {
  if (!fs.existsSync(file_path)) {
    fs.writeFileSync(file_path, JSON.stringify(content))
  }
}
