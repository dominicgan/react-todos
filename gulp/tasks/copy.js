const gulp         = require('gulp');
const config       = require('../config');
const chalk        = require('chalk');
const gnf          = require('gulp-npm-files');

gulp.task('copy-vendor', function() {
	console.log(chalk.cyan.inverse('Copying vendor assets'));
	gulp.src(gnf(), {base:'./node_modules/'})
		.pipe(gulp.dest(config.path.distpath + '/js/vendor'));
});

gulp.task('copy-html', function() {
	console.log(chalk.cyan.inverse('Copying html'));
	gulp.src(config.path.assetspath + '/html/**/*.html')
		.pipe(gulp.dest(config.path.distpath));
});

gulp.task('copy-data', function() {
	console.log(chalk.cyan.inverse('Copying data'));
	gulp.src(config.path.assetspath + '/data/**/*.json')
		.pipe(gulp.dest(config.path.distpath + '/data'));
});

gulp.task('copy', ['copy-vendor', 'copy-data', 'copy-html']);