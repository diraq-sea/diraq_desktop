const path = require('path')
const webpack = require('webpack')
const { dependencies } = require('../package.json')

let mainConfig = {
  entry: {
    main: path.join(__dirname, '../main/index.js'),
  },
  externals: [...Object.keys(dependencies || {})],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
        },
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist/electron'),
  },
  plugins: [new webpack.NoEmitOnErrorsPlugin()],
  target: 'electron-main',
}

module.exports = mainConfig
