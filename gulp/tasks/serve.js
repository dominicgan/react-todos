const gulp   = require('gulp');
const config = require('../config');
const chalk  = require('chalk');
const gls    = require('gulp-live-server');
const openurl = require('openurl');

gulp.task('express.serve', function(done) {
  console.log(chalk.magenta.inverse('» Starting express server'));
  var options = {env: process.env};
  options.env.NODE_ENV = 'production';
    // run your script as a server
    var server = gls(config.path.assetspath + '/server.js', options);
    server.start();
});


