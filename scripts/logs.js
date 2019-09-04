import chalk from 'chalk'

export default function(proc, data, color = 'green', isWebpack = false, colSize = 30) {
  let log = ''
  log += `${chalk[color].bold(`┏ ${proc} ${[...Array(colSize - 3 - proc.length)].join('-')}`)}\n\n`

  if (typeof data === 'object' && isWebpack) {
    data
      .toString({ chunks: false, colors: true })
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

  log += `${chalk[color].bold(`┗ ${[...Array(colSize - 2)].join('-')}`)}\n`
  console.log(log) // eslint-disable-line
}
