const fs = require('fs')

module.exports = (filePath, content) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(content))
  }
}
