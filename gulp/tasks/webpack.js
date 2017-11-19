const gulp = require('gulp');
const chalk        = require('chalk');
const config  = require('../config');
const webpack = require('webpack');
const webpackConfig = require('../../webpack/config');
const gutil = require('gutil');

gulp.task('webpack.build', function(done){
	console.log(chalk.magenta.inverse('» Building webpack assets'));
	return webpack(webpackConfig.webpackSettings)
		.run(onComplete(done));
});

function onComplete(done) {
	return function(err, stats) {
		if (err) {
			gutil.log('Error', err);
			if (done) {
				done();
			}
		} else {
			Object.keys(stats.compilation.assets).forEach(function(key) {
				gutil.log('Webpack: output ', chalk.green(key));
			});
			gutil.log('Webpack: ', chalk.blue('completed'));
			if (done) {
				done();
			}
		}
	}
}
