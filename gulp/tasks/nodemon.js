const gulp    = require('gulp');
const nodemon = require('gulp-nodemon');
const config  = require('../config');

gulp.task('nodemon', function(cb) {
  let started = false;
  return nodemon({
    script: __dirname+'/../../server.js',
    verbose: true,
    ignore: [
      'gulp/**/*.*',
      'assets/**/*.*',
      'html/**/*.*',
      'dist/**/*.*'
    ]
    }).on('start', function() {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
});
