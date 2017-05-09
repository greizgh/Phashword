const config = require('./webpack.common');
const webpack = require('webpack');

config.plugins = config.plugins || [];
config.plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production')
}));
config.plugins.push(new webpack.optimize.UglifyJsPlugin());

module.exports = config;
