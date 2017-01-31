/*
	LinkShrink.net
	Hosts: p.pw
 */

var vm = require('vm');
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
		
		var match = body.match(/\.href = ((\w+)\(.*?\))/);
		if (!match) {
			callback('Cannot find the target URL');
			return;
		}
		
		var functionCall = match[1];
		var functionName = match[2];
		
		match = body.match(new RegExp('<script>(function ' + functionName + '\\(.*?})</script>'));
		if (!match) {
			callback('Cannot find the decoding function');
			return;
		}
		
		var redirectUrl = vm.runInNewContext(match[1] + functionCall, {}, { timeout: 100 });
		redirectUrl = redirectUrl.replace(/^http:/, 'https:');
		
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
