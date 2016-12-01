module.exports = function(config) {
  config.set({

    frameworks: ['jasmine'],

    files: [
      '../test/**/*.spec.js'
    ],

    preprocessors: {
      '../test/**/*.spec.js': ['webpack']
    },

    browsers: ['Chrome']

  })
}
