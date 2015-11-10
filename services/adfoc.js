/*
	AdFoc.us
	Hosts: adfoc.us
 */

var request = require('request');

var Service = require('../service.js');

var service = new Service('AdFoc.us');
service.hosts = ['adfoc.us'];

service.run = function(url, callback) {
	var options = {
		uri: url,
		headers: {
			Accept: 'text/html'
		}
	};
	
	request(options, function(error, response, body) {
		if (error || response.statusCode != 200) {
			callback('Error while fetching the given URL. Response code: ' + response.statusCode);
			return;
		}
		
		var match = body.match(/click_url = "(.+?)";/);
		if (!match) {
			callback('The URL cannot be decrypted');
			return;
		}
		
		callback(null, match[1]);
	});
};

module.exports = service;
