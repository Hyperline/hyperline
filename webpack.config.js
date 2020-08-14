const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './src/index.js',
  output: {
    path: __dirname + "/dist",
    filename: 'hyperline.js',
    libraryTarget: 'commonjs'
  },
  devtool: 'cheap-module-source-map',
  plugins: [ new webpack.DefinePlugin({ 'global.GENTLY': false }) ],
  externals: [ nodeExternals(), 'hyper/component', 'hyper/notify', 'hyper/decorate', 'react' ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
