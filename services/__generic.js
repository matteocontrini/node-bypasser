/*
	Generic / Unknown services
 */

var request = require('request');

var Service = require('../service.js');
var common  = require('../common.js');

var service = new Service("Generic");
service.hosts = [];

service.run = function(url, callback) {
	var options = {
		url: url,
		followRedirect: false
	};
	
	request(options, function(error, response, body) {
		if (error || [301,302].indexOf(response.statusCode) == -1) {
      callback('URL not recognized as supported');
      return;
		}
		
		callback(null, response.headers.location);
	});
};

module.exports = service;
