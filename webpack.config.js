import path from 'path'
import webpack from 'webpack'
import pkg from './package'

const { API_BASE_URL, MOCK_ENABLED, NODE_ENV, S3_URL } = process.env

export default {
  entry: { main: path.join(__dirname, 'main') },
  externals: [...Object.keys(pkg.dependencies || {})],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: { loader: 'eslint-loader' },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/env', { targets: { node: 'current' } }]],
            plugins: ['dynamic-import-node'],
          },
        },
      },
    ],
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '~': path.join(__dirname, 'main'),
      '~~': process.cwd(),
      '@': path.join(__dirname, 'main'),
      '@@': process.cwd(),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({ API_BASE_URL, MOCK_ENABLED, NODE_ENV, S3_URL }),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  target: 'electron-main',
}
