const { exec } = require('child_process')
const platform = require('../../common/platform')
const tmpStore = require('../store/tmpfile.store')

module.exports = (filepath, commitId, extname) =>
  new Promise(resolve =>
    exec(
      `${{ win: '', mac: 'open', linux: 'xdg-open' }[platform.default]} "${filepath.replace(
        / /g,
        { win: ' ', mac: '\\ ', linux: '\\ ' }[platform.default],
      )}"`,
      resolve,
    ),
  ).then(resolve => {
    tmpStore.deleteFileInfo(commitId, extname)
    return resolve
  })
