// variables
const fs = require('fs');
const config = (module.exports = JSON.parse(fs.readFileSync('./config.json', 'utf8')));

module.exports = config;
