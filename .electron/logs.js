const chalk = require('chalk')

module.exports = (proc, data, color, isWebpack = false) => {
  let log = ''

  log += `${chalk[color].bold(`┏ ${proc} ${[...Array(27 - proc.length)].join('-')}`)}\n\n`

  if (typeof data === 'object' && isWebpack) {
    data
      .toString({
        colors: true,
        chunks: false,
      })
      .split(/\r?\n/)
      .forEach(line => {
        log += `  ${line}\n`
      })
    log += '\n'
  } else if (typeof data === 'object') {
    data
      .toString()
      .split(/\r?\n/)
      .forEach(line => {
        log += `  ${line}\n`
      })
  } else {
    log += `  ${data}\n`
  }

  log += `${chalk[color].bold(`┗ ${[...Array(28)].join('-')}`)}\n`

  console.log(log) // eslint-disable-line
}
