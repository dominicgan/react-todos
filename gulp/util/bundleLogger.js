/* bundleLogger
   ------------
   Provides gulp style logs to the bundle method in browserify.js
*/

const gutil        = require('gulp-util');
const prettyHrtime = require('pretty-hrtime');

module.exports = {
  start(filepath) {
    const startTime = process.hrtime();
    return gutil.log('Bundling', gutil.colors.green(filepath) + '...');
  },

  end(filepath) {
    const taskTime = process.hrtime(startTime);
    const prettyTime = prettyHrtime(taskTime);
    return gutil.log('Bundled', gutil.colors.green(filepath), 'in', gutil.colors.magenta(prettyTime));
  }
};
