const gulp         = require('gulp');
const config       = require('../config');
const path         = require('path');
const chalk        = require('chalk');
const gulpIf       = require('gulp-if');
const browserSync  = require('browser-sync');
const sass         = require('gulp-sass');
const concat       = require('gulp-concat');
const autoprefixer = require('autoprefixer');
const postcss      = require('gulp-postcss');
const sourcemaps   = require('gulp-sourcemaps');
const cssnano      = require('cssnano');


gulp.task('sass', function() {
    let plugins = [
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
    ];
	console.log(chalk.magenta.inverse('» Processing sass files'));
	return gulp.src([
		config.path.assetspath + '/assets/sass/**/*.scss',
		])
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(concat('style.css'))
        .pipe(postcss(plugins))
		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest(config.path.distpath + '/css'))
		.pipe(gulpIf(config.server.lrStarted, browserSync.stream({match: '**/*.css'})));
});

