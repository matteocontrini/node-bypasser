const fs   = require('fs');
const path = require('path');

// Loop through file and create a services array
var files = fs.readdirSync(path.join(__dirname, 'services'));
var services = [];

files.forEach(function(file) {
	if (file.match(/.*\.js/i)) {
		var mod = require('./services/' + file);
		services.push(mod);
	}
});

module.exports = services;
