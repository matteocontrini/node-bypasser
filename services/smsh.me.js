/*
	Smsh.me
	Hosts: smsh.me
 */

var request = require('request');

var Service = require('../service.js');
var cheerio = require('cheerio');

var service = new Service('Smsh.me');
service.hosts = ['smsh.me'];

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
		
		var link = $('a#redirectorTitle.websnapr').attr('href');
		
		callback(null, link);
	});
};

module.exports = service;
