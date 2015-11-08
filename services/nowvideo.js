/*
	NowVideo
	Hosts: nowvideo.li, nowvideo.eu, nowvideo.ch,
		   nowvideo.sx, nowvideo.co, nowvideo.ag,
		   nowvideo.ec, novamov.com
 */

var request = require('request');

var Service = require('../Service.js');
var common  = require('../common.js');

var service = new Service("NowVideo");
service.hosts = ['nowvideo.li', 'nowvideo.eu', 'nowvideo.ch', 'nowvideo.sx',
				 'nowvideo.co', 'nowvideo.ag', 'nowvideo.ec',
				 'novamov.com'];

service.run = function(url, callback) {
	request(url, function(error, response, body) {
		if (error || response.statusCode != 200) {
			callback('Errore while fetching the given URL. Response code: ' + response.statusCode);
			return;
		}
		
		var match = body.match(/var fkzd="(.+?)";/);
		if (!match) {
			var match = body.match(/filekey="(.+?)";/i);
			if (!match) {
				callback('The URL cannot be decrypted');
				return;
			}
		}
		var token = match[1];
		
		var match = body.match(/file="(.+?)";/);
		var fileId = match[1];
		
		var match = body.match(/domain="(.+?)";/);
		var domain = match[1];
		
		var url = domain + '/api/player.api.php?file=' + fileId + '&key=' + token;
		request(url, function(error, response, body) {
			if (error || response.statusCode != 200) {
				callback('The URL cannot be decrypted. Response code: ' + response.statusCode);
				return;
			}
			
			var match = body.match(/url=(.+?)&/);
			callback(null, match[1]);
		});
	});
};

module.exports = service;
