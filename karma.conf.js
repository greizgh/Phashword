const webpackConfig = require('./webpack.config');

webpackConfig.devtool = 'inline-source-map';
webpackConfig.entry = {};

module.exports = function (config) {
  config.set({
    browsers: ['Firefox'],
    files: [
      'tests.bundle.js',
    ],
    frameworks: ['chai', 'mocha'],
    plugins: [
      'karma-firefox-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
    preprocessors: {
      'tests.bundle.js': ['webpack', 'sourcemap'],
    },
    reporters: ['dots'],
    singleRun: true,
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
    },
  });
};
