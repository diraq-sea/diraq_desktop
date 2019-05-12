import webpack from 'webpack'
import { build as electronBuilder, createTargets, Platform } from 'electron-builder'
import mainConfig from '../webpack.config'

process.env.NODE_ENV = 'production'

/**
 * webpack による ECMAScript から CommonJS へのトランスコンパイルと minify を行う。
 * @returns {Promise}
 */
function compileMain() {
  return new Promise((resolve, reject) => {
    mainConfig.mode = process.env.NODE_ENV
    mainConfig.node = { __dirname: false, __filename: false }

    webpack(mainConfig, (err, stats) => {
      if (err) return reject(err)

      const info = stats.toString({ chunks: false, colors: true })

      if (stats.hasErrors()) return reject(info)

      console.log(info) // eslint-disable-line
      resolve()
    })
  })
}

/**
 * Electron アプリのビルドとパッケージを行う。
 */
async function build() {
  const buildTargets = []

  if (process.env.BUILD_LINUX) buildTargets.push(Platform.LINUX)
  if (process.env.BUILD_MAC) buildTargets.push(Platform.MAC)
  if (process.env.BUILD_WINDOWS) buildTargets.push(Platform.WINDOWS)
  if (buildTargets.length === 0) buildTargets.push(Platform.current())

  try {
    await compileMain()
    await electronBuilder({ targets: createTargets(buildTargets) })
  } catch (err) {
    console.error(err.stack || err) // eslint-disable-line
    process.exit(1)
  }
}

build()
