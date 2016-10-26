const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src'
  },
  module: {
    loaders: [
      {test: /\.ts$/, loader: 'ts'}
    ]
  },
  output: {
    libraryTarget: 'commonjs2',
    path: 'dist',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  target: 'node'
};
