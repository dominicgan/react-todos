'use strict';

const express    = require('express');
const app        = express();
const chalk      = require('chalk');
const bodyParser = require('body-parser');
const path       = require('path');
const fs         = require('fs');
const config     = (module.exports = JSON.parse(fs.readFileSync('./config.json', 'utf8')));

const _log = require('./server/log.js');
const _api = require('./server/api.js');

const router = express.Router();

const webpack = require('webpack');
const webpackConfig = require('./webpack/config');
const bundler = webpack(webpackConfig.webpackSettings);

let env = app.get('env');

if (env === 'development') {
const webpackMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require('webpack-hot-middleware');

	console.log('is dev');
	app.use(webpackMiddleware(bundler, {
		publicPath: webpackConfig.webpackSettings.output.publicPath,
		stats: { colors: true }
	}));

	app.use(webpackHotMiddleware(bundler));
}

app.use(_log.printRequests);

// static asset mapping routes
// map express asset url routes to folder location
app.use(express.static(__dirname + '/dist'));
app.use('/css', express.static(path.join(__dirname, 'dist/css')));
app.use('/js', express.static(path.join(__dirname, 'dist/js')));
app.use('/images', express.static(path.join(__dirname, 'dist/images')));

// parse req body
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

router.route('/todos')
	.get(_api.get)
	.post(_api.post);

app.listen(config.server.connection.port);
