module.exports = {
  entry: {
    content: './src/content.js',
    background: './src/background.js',
  },
  output: {
    path: './dist',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: []
    },
    {
      test: /\.json$/,
      loaders: [
        "json",
      ],
    }]
  }
};
