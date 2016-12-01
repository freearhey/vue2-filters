module.exports = function(config) {
  var configuration = {

    frameworks: ['jasmine'],

    files: [
      '../test/**/*.spec.js'
    ],

    preprocessors: {
      '../test/**/*.spec.js': ['webpack']
    },

    browsers: ['Chrome'],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }

  }

  if(process.env.TRAVIS){
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
}
