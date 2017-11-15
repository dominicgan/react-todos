const gulp        = require('gulp');
const config      = require('../config');
const chalk       = require('chalk');
const runSequence = require('run-sequence');
const fs          = require('fs');
const moment      = require('moment');
const zip         = require('gulp-zip');

const buildDate = moment().format('YYYYMMDD-HHmmss');
const packageName = `yaytray-static-${buildDate}.zip`;

gulp.task('release', function (){
    return gulp.src(config.path.distpath + '/**/*')
        .pipe(zip(packageName))
        .pipe(gulp.dest('./releases'))
});
