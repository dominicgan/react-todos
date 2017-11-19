const path = require('path');
const fs   = require('fs');

module.exports = {
	get: function(req, res, next){
		console.log('get data');
		console.log('req', req._parsedUrl, req.params, req.query);

		// serve basic todo list if params id=1
		if (req.query.id && req.query.id === '1') {
			console.log('yes');
			res.sendFile('dist/data/data.json', { root: process.cwd() });
		} else {
			res.status(500).send('List not found');
			return next();
		}
	},
	post: function(req,res){
		console.log('post data');
		console.log(req.body);

		// for the purpose of this demo
		// simply rewrite the entire json file with the updated values
		let reqFormatted = JSON.stringify(req.body);
		fs.writeFile(path.join(process.cwd(), "/dist/data/data.json"), reqFormatted, function(err) {
			if(err) {
				return console.log(err);
			}
		});
		res.send(req.body);
		res.end();
	}
}