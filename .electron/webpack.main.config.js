const path = require('path')
const webpack = require('webpack')
const { dependencies } = require('../package.json')

let mainConfig = {
  entry: {
    main: path.join(__dirname, '../main'),
  },
  externals: [...Object.keys(dependencies || {})],
  node: { __dirname: process.env.NODE_ENV !== 'production' },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/env',
                {
                  targets: {
                    node: 'current',
                  },
                },
              ],
            ],
            plugins: ['dynamic-import-node'],
          },
        },
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
