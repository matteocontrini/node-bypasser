/*
	Simple 301 redirect sites
	Hosts: bit.ly, bitly.com, j.mp, goo.gl
 */

var request = require('request');

var Service = require('../Service.js');
var common  = require('../common.js');

var service = new Service("Simple 301 redirect sites");
service.hosts = ['bit.ly','bitly.com','j.mp','goo.gl'];

service.run = function(url, callback) {
	var options = {
		url: url,
		followRedirect: false
	};
	
	request(options, function(error, response, body) {
		if (error || response.statusCode != 301) {
			callback('Unexpected response status code. Response code: ' + response.statusCode);
			return;
		}
		callback(null, response.headers.location);
	});
};

module.exports = service;
