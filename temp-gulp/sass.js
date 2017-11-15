const gulp           = require('gulp');
const config         = require('../config');
const path           = require('path');
const chalk          = require('chalk');
const handleErrors   = require('../util/handleErrors');
const gulpIf         = require('gulp-if');
const browserSync    = require('browser-sync');
const sass           = require('gulp-sass');
const concat         = require('gulp-concat');
const autoprefixer   = require('autoprefixer');
const postcss        = require('gulp-postcss');
const gradientfixer  = require('postcss-gradientfixer');
const sourcemaps     = require('gulp-sourcemaps');
const moduleImporter = require('sass-module-importer');

gulp.task('sass', function() {
	console.log(chalk.magenta.inverse('» Processing sass files'));
	return gulp.src([
		config.path.assetspath + '/assets/sass/**/*.scss',
		])
	.pipe(sourcemaps.init())
	.pipe(sass())
	.on('error', handleErrors)
	.pipe(concat('style.css'))
	.pipe(sourcemaps.write('maps'))
	.pipe(gulp.dest(config.path.distpath + '/css'))
	.pipe(gulpIf(config.server.lrStarted, browserSync.stream({match: '**/*.css'})));
});

