const chalk     = require('chalk');
const useragent = require('useragent');
const path      = require('path');

module.exports = {
	printRequests: function (req, res, next) {
		// print requests to console
			let timestamp = new Date(Date.now()).toLocaleString();
			let reqType   = req.method;
			let reqDoc    = req.url;
			let extension = path.extname(reqDoc);
			let dirname   = path.dirname(reqDoc);
			// ignore image, font & sourcemap files
			if (extension !== '.map' &&
				dirname.indexOf('images') < 0 &&
				dirname.indexOf('fonts') < 0) {
				let agent = useragent.parse(req.headers['user-agent']);
			let reqAgent  = agent.toString();
			let reqDocString;

			switch (extension) {
				case '.js': {
					if (dirname.indexOf('vendor') >= 0 || dirname.indexOf('plugins') >= 0) {
						reqDocString = chalk.yellow(reqDoc);
					} else {
						reqDocString = chalk.green(reqDoc);
					}
				}
				break;
				case '.css':
				reqDocString = chalk.blue(reqDoc);
				break;
				case '.json':
				reqDocString = chalk.magenta(reqDoc);
				break;
				default:
				reqDocString = chalk.cyan(reqDoc);
				break;
			}
			console.log(chalk.magenta(timestamp.split(', ')[1]) + ' ' + chalk.green.inverse(reqType) + ' ' + reqDocString + ' ' + chalk.gray(reqAgent));
		}
		next();
	}
};
