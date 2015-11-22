/*
 Oni.vn
 Hosts: oni.vn
 */

var request = require('request');
var Service = require('../service.js');
var service = new Service('Oni.vn');
var cheerio = require('cheerio');

service.hosts = ['oni.vn'];

service.run = function(url, callback) {

	request(url, function(error, response, body) {
		if (error || response.statusCode != 200) {
			callback('Unexpected response status code. Response code: ' + response.statusCode);
			return;
		}

		var $ = cheerio.load(body);

		var link = $('meta[property="og:url"]').attr('content');

		callback(null, link);
	});
};

module.exports = service;
