module.exports = function(config) {
  config.set({

    frameworks: ['jasmine'],

    files: [
      '../test/**/*.spec.js'
    ],

    preprocessors: {
      '../test/**/*.spec.js': ['webpack']
    },

    browsers: ['PhantomJS'],

    webpack: {
      module: {
        loaders: [
          { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
      }
    }

  })
}
