/*
	LinkShrink.net
	Hosts: p.pw
 */

var request = require('request');

var Service = require('../service.js');

var service = new Service('LinkShrink.net');
service.hosts = ['linkshrink.net'];

service.run = function(url, callback) {
	var options = {
		url: url,
		followRedirect: false
	};
	
	request(options, function(error, response, body) {
		if (error || response.statusCode != 200) {
			callback('Unexpected response status code. Response code: ' + response.statusCode);
			return;
		}
		
		var match = body.match(/\.href = revC\("(.*?)"\)/);
		if (!match) {
			callback('Cannot find the target URL');
			return;
		}
		
		var redirectUrl = 'https://linkshrink.net/' + new Buffer(match[1], 'base64').toString();
		
		//TODO : Retractor this
		request({ url: redirectUrl, followRedirect: false }, function(error, response, body) {
			if (error || response.statusCode != 302) {
				callback('Unexpected response status code. Response code: ' + response.statusCode);
				return;
			}
			callback(null, response.headers.location);
		});
	});
};

module.exports = service;
