const { exec } = require('child_process')
const { PLATFORM } = require('../const')

module.exports = filepath =>
  new Promise(resolve =>
    exec(`${{ win: 'start', mac: 'open', linux: 'xdg-open' }[PLATFORM]} ${filepath}`, resolve),
  )
