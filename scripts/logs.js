import chalk from 'chalk'

/**
 * 標準出力、標準エラー出力をブロックにまとめて表示する。
 * @param {string} proc ブロックの見出しとして表示する文字列
 * @param {any} data コンソールに表示するデータ
 * @param {string} [color=green] 見出し、枠線に適用する文字色（ CSS keywords ）
 * @param {boolean} [isWebpack=false] データが webpack の Stats Object か否かのフラグ
 * @param {number} [colSize=30] ブロックの見出しの枠線の幅
 */
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
