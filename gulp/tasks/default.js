const gulp        = require('gulp');
const config      = require('../config');
const del         = require('del');
const chalk       = require('chalk');
const runSequence = require('run-sequence');
const fs          = require('fs');

gulp.task('default', function(cb) {
  return runSequence('dev');
});

gulp.task('serve', ['clean'], function(cb) {
  console.log(chalk.magenta.inverse('» Building package...'));
  console.log(chalk.magenta(process.env.NODE_ENV));
  runSequence(
    'copy',
    'sass',
    'webpack.build',
    'express.serve'
    );
  return console.log(chalk.yellow.inverse('build complete'));
});

gulp.task('dev', ['clean'], function(cb) {
  console.log(chalk.magenta.inverse('» Building for development...'));
  console.log(chalk.magenta(process.env.NODE_ENV));
  runSequence(
    'copy',
    'sass',
    'nodemon',
    ['browsersync', 'watch.dev']);
  return console.log(chalk.yellow.inverse('dev server complete'));
});

gulp.task('clean', function() {
  console.log(chalk.magenta.inverse('» Deleting...'));
  return del.sync([config.path.distpath, '!*.git'], {force: true}, function(err, deletedFiles) {
    if (err) {
      return console.log(chalk.red(`Error deleting files: ${err}`));
    }
  });
});
