/*
  P.pw
  Hosts: p.pw
 */

var request = require('request');
var Service = require('../service.js');
var service = new Service('Oni.vn');
service.hosts = ['oni.vn'];

service.run = function(url, callback) {

	var options = {
		url: url
	};

	request = request.defaults({ jar: true });

	request(options, function(error, response, body) {
		if (error || response.statusCode != 200) {
			callback('Unexpected response status code. Response code: ' + response.statusCode);
			return;
		}
		
		var data = body.match(/data:"(.*)",/)[1];

		console.log(data);
		
		options = {
			url: 'http://www.oni.vn/click.html?' + data,
			headers: {
				'Content-Type':'application/json; charset=utf-8',
				Host: 'www.oni.vn',
				Referer: url
			}
		};

		request(options, function(error, response, body) {
			console.log(body);
		});
		//console.log(parsedUrl);
	});
};

module.exports = service;
