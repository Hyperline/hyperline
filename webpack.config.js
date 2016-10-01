const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'hyperline.js',
    libraryTarget: 'commonjs'
  },
  plugins: [ new webpack.DefinePlugin({ 'global.GENTLY': false }) ],
  externals: [ nodeExternals() ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  }
}
