const context = require.context('./test', true, /\.jsx?$/);
context.keys().forEach(context);
module.exports = context;
