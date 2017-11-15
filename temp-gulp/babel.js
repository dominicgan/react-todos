const gulp       = require('gulp');
const config     = require('../config');
const sourcemaps = require("gulp-sourcemaps");
const babel      = require("gulp-babel");
const concat     = require("gulp-concat");
const merge      = require('merge-stream');
const debug      = require('gulp-debug');
const polyfill   = './node_modules/babel-polyfill/dist/polyfill.min.js';

gulp.task("babel", function () {
	var polyfillSrc = gulp.src(polyfill)
	.pipe(gulp.dest(config.path.distpath + '/js'));

	var customJs = gulp.src(config.path.assetspath + '/assets/js/**/*.js')
	.pipe(sourcemaps.init())
	.pipe(babel())
	// .pipe(concat("all.js"))
	.pipe(sourcemaps.write("."))
	.pipe(gulp.dest(config.path.distpath + '/js'));

	return merge(polyfillSrc, customJs)
	.pipe(debug({title: 'babel-merge:'}));
});
