const path = require('path');

module.exports = {
  entry: {
    content: './src/content.js',
    popup: './src/popup.jsx',
    background: './src/background.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
    },
    {
      test: /\.json$/,
      loaders: [
        'json',
      ],
    }],
  },
};
