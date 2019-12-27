const { exec } = require('child_process')
const platform = require('../../common/platform')

module.exports = (filepath, commitId, extname) =>
  new Promise(resolve => {
    if (platform.default === 'win') {
      exec(`"${filepath}"`, resolve)
    } else {
      exec(
        `${{ mac: 'open', linux: 'xdg-open' }[platform.default]} ${filepath.replace(/ /g, '\\ ')}`,
        resolve,
      )
    }
  })
