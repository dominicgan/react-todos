// const gulp        = require('gulp');
// const browserSync = require('browser-sync');
// const config      = require('../config');
// const chalk       = require('chalk');

// const connection = {};

/*
 Run the build task and start a server with BrowserSync
*/

// gulp.task('browsersync', () =>
//   // Serve files and connect browsers
//   browserSync({
//     server: {
//       baseDir: config.path.distpath
//     },
//     // proxy: 'http://localhost:5000',
//     notify: {
//       styles: {
//         top:      'auto',
//         bottom:     '0',
//         borderRadius:   '5px 5px 0 0',
//         background:   'rgba(27,32,50,0.7)',
//         fontSize: '14px'
//       }
//     },
//     logConnections: false,
//     debugInfo: false,
//     open: true
//   }, function(err, data) {
//     if (err !== null) {
//       console.log(
//         chalk.red('✘  Setting up a local server failed... Please try again. Aborting.\n') +
//         chalk.red(err)
//       );
//       process.exit(0);
//     }

//     // Store started state globally
//     connection.external = data.options.external;
//     connection.port = data.options.port;
//     return config.server.lrStarted = true;
//   })
// );

// gulp.task('browsersyncspeed', () =>
//   // Serve files and connect browsers
//   browserSync({
//     // server: {
//     //   baseDir: config.path.distpath
//     // },
//     proxy: 'http://localhost:5000',
//     notify: {
//       styles: {
//         top:      'auto',
//         bottom:     '0',
//         borderRadius:   '5px 5px 0 0',
//         background:   'rgba(27,32,50,0.7)',
//         fontSize: '14px'
//       }
//     },
//     logConnections: false,
//     debugInfo: false,
//     open: false
//   }, function(err, data) {
//     if (err !== null) {
//       console.log(
//         chalk.red('✘  Setting up a local server failed... Please try again. Aborting.\n') +
//         chalk.red(err)
//       );
//       process.exit(0);
//     }

//     // Store started state globally
//     connection.external = data.options.external;
//     connection.port = data.options.port;
//     return config.server.lrStarted = true;
//   })
// );

// new browsersync task
const gulp                 = require('gulp');
const browserSync          = require('browser-sync');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig        = require('../../webpack.config');
const webpack              = require('webpack');
const bundler              = webpack(webpackConfig.webpackSettings);
const config               = require('../config');
const chalk                = require('chalk');

const connection = {};

gulp.task('browsersync.webpack', function(callback) {
  browserSync({
    server: {
      baseDir: [ './dist/' ],
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackConfig.webpackSettings.output.publicPath,
          stats: { colors: true }
        }),
        webpackHotMiddleware(bundler)
      ]
    },
    notify: {
      styles: {
        top:      'auto',
        bottom:     '0',
        borderRadius:   '5px 5px 0 0',
        background:   'rgba(27,32,50,0.7)',
        fontSize: '14px'
      }
    },
    files: [
      './dist/css/' + '**/*.css',
      './dist/' + '**/*.html'
    ]
 }, function(err, data) {
    if (err !== null) {
      console.log(
        chalk.red('✘  Setting up a local server failed... Please try again. Aborting.\n') +
        chalk.red(err)
      );
      process.exit(0);
    }

    // Store started state globally
    connection.external = data.options.external;
    connection.port = data.options.port;
    return config.server.lrStarted = true;
 });
});
