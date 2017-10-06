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

    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-webpack'
    ],

    webpack: {
      entry: './src/index.js',
      module: {
        rules: [
          { 
            test: /\.js$/, 
            exclude: /node_modules/, 
            use: [ 'babel-loader' ]
          }
        ]
      }
    }

  })
}
