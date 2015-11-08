/*
	Shorte.st
	Hosts: sh.st, u2ks.com, jnw0.com, digg.to, dh10thbvu.com
 */

var request = require('request');

var Service = require('../service.js');
var common  = require('../common.js');

var service = new Service("Shorte.st");
service.hosts = ['sh.st','u2ks.com','jnw0.com','digg.to','dh10thbvu.com'];

service.run = function(url, callback) {
	var options = {
		url: url,
		followRedirect: false
	};
	
	request(options, function(error, response, body) {
		if (error || response.statusCode != 302) {
			callback('Unexpected response status code. Response code: ' + response.statusCode);
			return;
		}
		
		callback(null, response.headers.location);
	});
};

module.exports = service;
