/*
	NowVideo
	Hosts: nowvideo.li, nowvideo.eu, nowvideo.ch,
		   nowvideo.sx, nowvideo.co, nowvideo.ag,
		   nowvideo.ec, novamov.com
 */

var request = require('request');

var Service = require('../service.js');

var service = new Service('NowVideo');
service.hosts = ['nowvideo.li', 'nowvideo.eu', 'nowvideo.ch', 'nowvideo.sx',
				 'nowvideo.co', 'nowvideo.ag', 'nowvideo.ec',
				 'auroravid.to'];

service.run = function(url, callback) {
	// Switch to mobile page
	// http://www.auroravid.to/video/94f6df18e053e
	// http://www.auroravid.to/mobile/video.php?id=94f6df18e053e
	url = url.replace('video/', 'mobile/video.php?id=');
		
	request(url, function(error, response, body) {
		if (error || response.statusCode != 200) {
			callback('Error while fetching the given URL. Response code: ' + response.statusCode);
			return;
		}
		
		var match = body.match(/<source src="(.+?)" type/);
		
		if (match) {
			callback(null, match[1]);
		}
		else {
			callback('The URL cannot be decrypted');
		}
	});
};

module.exports = service;
