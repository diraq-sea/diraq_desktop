const { exec } = require('child_process')
const platform = require('../../common/platform')

module.exports = filepath =>
  new Promise(resolve =>
    exec(
      `${{ win: 'start', mac: 'open', linux: 'xdg-open' }[platform.default]} ${filepath}`,
      resolve,
    ),
  )
