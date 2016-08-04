var path = require('path');

module.exports = {
  entry: [
    './src/TableContainer.js'
  ],
  output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: 'index.js',
      library: 'ReactCustomTable',
      libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
