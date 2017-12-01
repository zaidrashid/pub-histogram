// Karma configuration
// Generated on Sat Nov 25 2017 22:59:37 GMT+0800 (Malay Peninsula Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/angular-sanitize/angular-sanitize.min.js',
      'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
      'node_modules/moment/moment.js',
      'node_modules/highcharts/highcharts.js',
      'src/mainModule.js',
      'src/mainRoute.js',
      'src/mainController.js',
      'src/components/**/*.js',
      'src/components/**/*.html',
      'src/search/**/*.js',
      'src/factory/**/*.js',
      'src/models/**/*.js',
      'src/publication/**/*.js',
      'src/highcharts/**/*.js',
      'src/util/**/*js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'src/**/!(*.test).js': ['coverage'],
      'src/components/**/*.html': ['ng-html2js'],
    },

    ngHtml2JsPreprocessor: {
      // If your build process changes the path to your templates,
      // use stripPrefix and prependPrefix to adjust it.
      stripPrefix: 'src/',

      // the name of the Angular module to create
      moduleName: 'testtemplates'
  },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // optionally, configure the reporter
    coverageReporter: {
      type: 'html',
      reporters: [
          // reporters not supporting the `file` property
          {
              type: 'html',
              dir: '.reports/coverage',
              subdir: 'html'
          }
      ]
  },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-html-reporter',
      'karma-ng-html2js-preprocessor'
  ]
  });
};
