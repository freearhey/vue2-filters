var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue2-filters.js',
    libraryTarget: "umd",
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  }
};