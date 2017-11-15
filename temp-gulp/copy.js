const gulp         = require('gulp');
const config       = require('../config');
const chalk        = require('chalk');
const fs           = require('fs');
const merge        = require('gulp-merge-json');
const handleErrors = require('../util/handleErrors');
const wrap         = require('gulp-wrap');
const rename       = require('gulp-rename');
const runSequence  = require('run-sequence');
const gnf          = require('gulp-npm-files');
const flatten      = require('gulp-flatten');

// gulp.task('copy', ['copy-data', 'copy-images', 'copy-vendor', 'copy-plugins', 'copy-fonts']);
gulp.task('copy', ['copy-data', 'imagemin', 'copy-images', 'copy-vendor', 'copy-plugins', 'copy-fonts']);

gulp.task('copy-data', ['copy-concat-data'], function() {
	console.log(chalk.cyan.inverse('Copying dummy data'));
	return gulp.src([config.path.assetspath + '/assets/data/rest/**/*.*'])
		.pipe(gulp.dest(config.path.distpath + '/data/'));
});

gulp.task('copy-concat-data', function() {
	console.log(chalk.cyan.inverse('Concatenating pug data...'));
	return gulp.src([config.path.assetspath + '/assets/data/pug/**/*.*'])
		.pipe(merge({
			fileName: 'pugdata.json'
			}))
		// .on('error', handleErrors)
		.pipe(gulp.dest(config.path.distpath + '/data'))
		.pipe(wrap('{"data": <%= contents %>}',{}, {parse : false}))
		.pipe(rename({
			basename: 'pugbuild'
			}))
		.pipe(gulp.dest(config.path.distpath + '/data'))
});

// only copy non converted images
gulp.task('copy-images', function() {
	console.log(chalk.cyan.inverse('Copying images'));
	return gulp.src([
		config.path.assetspath + '/assets/images/**/*.*',
		'!'+config.path.assetspath + '/assets/images/**/*.{jpg,jpeg,JPG,png,svg,gif}'
		])
		.pipe(gulp.dest(config.path.distpath + '/images'));
});

gulp.task('copy-plugins', function() {
	console.log(chalk.cyan.inverse('Copying plugins'));
	return gulp.src([config.path.assetspath + '/assets/plugins/**/*.*'])
		.pipe(gulp.dest(config.path.distpath + '/js/plugins'));
});

gulp.task('copy-vendor', function() {
	console.log(chalk.cyan.inverse('Copying vendor assets'));
	gulp.src(gnf(), {base:'./node_modules/'})
	.pipe(gulp.dest(config.path.distpath + '/js/vendor'));
});

gulp.task('copy-fonts', function() {
	console.log(chalk.cyan.inverse('Copying fonts'));
	return gulp.src([
		config.path.assetspath + '/assets/fonts/**/*'
		])
		.pipe(gulp.dest(config.path.distpath + '/fonts'));
});

