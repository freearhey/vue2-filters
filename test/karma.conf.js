const puppeteer = require('puppeteer')
process.env.CHROME_BIN = puppeteer.executablePath()

module.exports = function(config) {
  config.set({

    frameworks: ['jasmine'],

    files: [
      '../test/**/*.spec.js'
    ],

    preprocessors: {
      '../test/**/*.spec.js': ['webpack']
    },

    browsers: ['ChromeHeadless'],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-webpack'
    ],

    webpack: {
      entry: './src/index.js',
      mode: 'development'
    }

  })
}
