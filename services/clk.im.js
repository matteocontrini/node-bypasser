/*
  P.pw
	Hosts: p.pw
 */

var request = require('request');

var Service = require('../service.js');
var common  = require('../common.js');

var service = new Service('Clk.im');
service.hosts = ['clk.im'];

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
		
		var link = body.match(/\$\("\.countdown"\)\.attr\("href","([^"]+)"\)/);
		
		callback(null, link[1]);
	});
};

module.exports = service;
