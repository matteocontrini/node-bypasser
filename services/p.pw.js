/*
  P.pw
	Hosts: p.pw
 */

var request = require('request');

var Service = require('../service.js');
var common  = require('../common.js');

var service = new Service("P.pw");
service.hosts = ['p.pw'];

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

    var link = body.match(/window\.location = "(.*)";/);

		callback(null, link[1]);
	});
};

module.exports = service;
