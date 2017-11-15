const gulp         = require('gulp');
const config       = require('../config');
const path         = require('path');
const chalk        = require('chalk');
const runSequence  = require('run-sequence');
const handleErrors = require('../util/handleErrors');
const gulpIf       = require('gulp-if');
const browserSync  = require('browser-sync');
const pug          = require('gulp-pug');
const data         = require('gulp-data');
const mergejson    = require('merge-json');

gulp.task('pug', function() {
  console.log(chalk.magenta.inverse('» Processing pug files'));
  return gulp.src([
    config.path.assetspath + '/html/templates/*.pug',
    config.path.assetspath + '/html/templates/**/*.pug'
    ])
    .pipe(data(function() {
      return builddata = require(__dirname + '/../../dist/data/pugbuild.json');
    }))
    .pipe(pug({
      verbose: true,
      pretty: true,
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.path.distpath));
    // .pipe(gulpIf(config.server.lrStarted, browserSync.reload({stream:true})));
});
