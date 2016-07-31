/*
	Oxyl.me
	Hosts: oxyl.me
 */

var request = require('request');
var Service = require('../service.js');
var _url    = require('url');

var service = new Service('Oxyl.me');
service.hosts = ['oxyl.me'];

service.run = function(url, callback) {
	// Enable cookies
	// request = request.defaults({ jar: true });

	var hash = _url.parse(url).pathname.slice(1);

	var options = {
		url: 'http://oxyl.me/v1/protected',
		method: 'POST',
		body: {
			hash: hash
		},
		json: true
	};
	request(options, function(error, response, body) {
		if (error || response.statusCode != 200) {
			callback('Error while fetching the given URL. Response code: ' + response.statusCode);
			return;
		}

		var links = body.links.map(x => x['url']);

		if (links.length === 1) {
			callback(null, links[0]);
			return;
		}

		callback(null, links);
		return;
	});
};

module.exports = service;
