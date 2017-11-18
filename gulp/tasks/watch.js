const gulp        = require('gulp');
const gutil       = require('gulp-util');
const config      = require('../config');
const browserSync = require('browser-sync');
const runSequence = require('run-sequence');

/*
 * Start browsersync task and then watch files for changes
*/

const changeEvent = evt => gutil.log('File', gutil.colors.cyan(evt.path.replace(new RegExp(`/.*(?=/${config.path.assetspath})/`), '')), 'was', gutil.colors.magenta(evt.type));

gulp.task('watch.dev', function() {
  console.log('begin watch');
  gulp.watch([config.path.assetspath + '/html/**/*.html']).on('change', function(evt) {
    changeEvent(evt);
    return runSequence('copy-html');
  });

  return gulp.watch([config.path.assetspath + '/assets/sass/**/*.scss']).on('change', function(evt) {
    changeEvent(evt);
    return runSequence('sass');
  });
});
