import webpack from 'webpack'
import mainConfig from '../webpack.config'

process.env.NODE_ENV = 'production'

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

async function build() {
  try {
    await compileMain()
  } catch (err) {
    console.error(err.stack || err) // eslint-disable-line
    process.exit(1)
  }
}

build()
