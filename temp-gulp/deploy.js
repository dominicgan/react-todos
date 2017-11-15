const gulp    = require('gulp');
const config  = require('../config');
const netlify = require('gulp-netlify');

gulp.task('deploy', function() {
  console.log(chalk.magenta.inverse('» Deploying site to netlify...'));
  return gulp.src([config.path.distpath+'/**/*'])
    .pipe(netlify({
      site_id: config.netlify.site_id,
      access_token: config.netlify.access_token
    }));
  return console.log(chalk.pink('Deploy Successful'));
});