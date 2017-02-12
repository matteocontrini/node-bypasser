/*
	Link5s.com
	Hosts: link5s.com
 */

var request = require('request');

var Service = require('../service.js');
var cheerio = require('cheerio');
var _url    = require('url');

var service = new Service('Link5s.com');
service.hosts = ['link5s.com'];

service.run = function(url, callback) {
	// Enable cookies
	request = request.defaults({ jar: true });
	
	request(url, function(error, response, body) {
		if (error || response.statusCode != 200) {
			callback('Error while fetching the given URL. Response code: ' + response.statusCode);
			return;
		}
		
		var $ = cheerio.load(body);
		
		var seconds = 6;
		var cmpID = $('#iframeID').attr('data-cmp');
		var user = $('#iframeID').attr('data-u');
		var postUrl = 'http://link5s.com/ajax/r.php';
		// Get url path without slash
		var page = _url.parse(url).pathname.slice(1);
		
		var options = {
			url: postUrl,
			form: { page: page, advID: cmpID, u: user },
			method: 'POST'
		};
		
		setTimeout(updateCountdown, 1000);
		
		function updateCountdown() {
			seconds--;
			if (seconds >= 0) {
				request(options, function(error, response, body) {
					if (error || response.statusCode != 200) {
						callback('Error while fetching the given URL. Response code: ' + response.statusCode);
						return;
					}
					
					// If we get final result
					if (body.length > 1) {
						
						$ = cheerio.load(body);
						var link = $('a').attr('href');
						
						if (link) {
							callback(null, link);
						}
						else {
							callback('The URL cannot be decrypted');
						}
					}
				});
				
				setTimeout(updateCountdown, 1000);
			}
		}
	});
};

module.exports = service;
