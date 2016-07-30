module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'hyperline.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
