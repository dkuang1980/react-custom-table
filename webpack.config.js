var path = require('path');

module.exports = {
  entry: [
    './index.js'
  ],
   output: {
      path: path.join(__dirname, 'build'),
      publicPath: '/',
      filename: '[name].js',
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
