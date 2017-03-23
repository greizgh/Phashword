const webpackConfig = require('./webpack.config');

webpackConfig.devtool = 'inline-source-map';
webpackConfig.module.rules.push({
  test: /\.jsx?$/,
  exclude: /(test|node_modules)/,
  use: ['isparta-loader'],
  enforce: 'pre',
});
webpackConfig.externals = {
  'cheerio': 'window',
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true,
};

module.exports = (config) => {
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
      'karma-coverage',
    ],
    preprocessors: {
      'tests.bundle.js': ['webpack', 'sourcemap'],
    },
    reporters: ['dots', 'coverage'],
    singleRun: true,
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcov', subdir: 'lcov' },
      ]
    }
  });
};
