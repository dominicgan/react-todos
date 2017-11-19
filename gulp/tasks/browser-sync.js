// new browsersync task
const gulp                 = require('gulp');
const browserSync          = require('browser-sync');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig        = require('../../webpack/config');
const webpack              = require('webpack');
const bundler              = webpack(webpackConfig.webpackSettings);
const config               = require('../config');
const chalk                = require('chalk');

const connection = {};

gulp.task('browsersync', function(callback) {
  browserSync({
    proxy: 'http://localhost:5000',
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
        borderRadius: '5px 5px 0 0',
        background: 'rgba(27,32,50,0.7)',
        fontSize: '14px'
      }
    },
    files: [
      config.distpath + '/css/**/*.css',
      config.distpath + '/**/*.html'
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
