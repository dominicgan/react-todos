const gulp        = require('gulp');
const gutil       = require('gulp-util');
const config      = require('../config');
const browserSync = require('browser-sync');
const runSequence = require('run-sequence');

/*
 * Start browsersync task and then watch files for changes
*/

const changeEvent = evt => gutil.log('File', gutil.colors.cyan(evt.path.replace(new RegExp(`/.*(?=/${config.path.assetspath})/`), '')), 'was', gutil.colors.magenta(evt.type));


gulp.task('watch', ['browsersync'], function() {
  gulp.watch([config.path.assetspath + '/assets/data/pug/**/*.*']).on('change', function(evt) {
    changeEvent(evt);
    return runSequence('copy-concat-data');
    // browserSync.reload()
  });

  gulp.watch([config.path.assetspath + '/assets/img/**/*']).on('change', evt => changeEvent(evt));

  gulp.watch([config.path.assetspath + '/html/**/*.pug']).on('change', function(evt) {
    changeEvent(evt);
    return runSequence('pug', 'reload');
    // browserSync.reload()
  });

  gulp.watch([config.path.assetspath + '/assets/sass/**/*.scss', config.path.assetspath + '/assets/sass/**/*.sass']).on('change', function(evt) {
    changeEvent(evt);
    return runSequence('sass', 'sass-basic');
    // browserSync.reload()
  });

  gulp.watch([config.path.assetspath + '/assets/ts/**/*.ts']).on('change', function(evt) {
    changeEvent(evt);
    return runSequence('ts', 'compile-js-basic', 'reload');
  });

  gulp.watch([config.path.assetspath + '/spec/**/*.ts']).on('change', function(evt) {
    changeEvent(evt);
    return runSequence('compile-specs');
    // browserSync.reload()
  });

  return gulp.watch([config.path.assetspath + '/spec/unit/**/*.*']).on('change', function(evt) {
    changeEvent(evt);
    return runSequence('copy-specs');
    // browserSync.reload()
  });
});

gulp.task('watch.dev', ['browsersync.webpack'], function() {
  return gulp.watch([config.path.assetspath + '/html/**/*.html']).on('change', function(evt) {
    changeEvent(evt);
    return runSequence('copy-html');
    // browserSync.reload()
  });

  gulp.watch([config.path.assetspath + '/assets/scss/**/*.(scss|sass)']).on('change', function(evt) {
    changeEvent(evt);
    return runSequence('sass');
    // browserSync.reload()
  });
});
