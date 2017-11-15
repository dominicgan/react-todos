const gulp        = require('gulp');
const chalk       = require('chalk');
const config      = require('../config');
const gulpIf      = require('gulp-if');
const browserSync = require('browser-sync');

gulp.task('reload', () =>
    gulp.src([config.path.distpath])
    .pipe(gulpIf(config.server.lrStarted, browserSync.reload({stream:true})))
);
