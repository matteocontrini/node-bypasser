/*
	LinkShrink.net
	Hosts: p.pw
 */

var request = require('request');

var Service = require('../service.js');

var cheerio = require('cheerio');

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
		var $ = cheerio.load(body);
		
		var redirectUrl = $('#skip .bt').attr('href');
		
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
