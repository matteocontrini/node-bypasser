/*
	Linkbucks
	Hosts: linkbucks.com
 */

var request = require('request');

var Service = require('../service.js');
var common  = require('../common.js');

var service = new Service('Linkbucks');
service.hosts = ['linkbucks.com'];

service.run = function(url, callback) {
	request(url, function(error, response, body) {
		if (error || response.statusCode != 200) {
			callback('Errore while fetching the given URL. Response code: ' + response.statusCode);
			return;
		}
		
		var lines = body.match(/[^\r\n]+/g);
		var startLine = -1;
		var endLine = -1;
		var found = false;
		var line = null;
		
		for (var i = 0; i < lines.length; i++) {
			line = lines[i];
			if (line.trim().startsWith('(function() {')) {
				startLine = i;
				continue;
			}
			if (line.trim().startsWith('})();')) {
				if (found) {
					// Found the right function block; exit
					endLine = i;
					break;
				}
				else {
					// Restart search...
					startLine = -1;
					continue;
				}
			}
			if (startLine == -1) {
				continue;
			}
			
			if (line.trim().startsWith('var f = window[\'init\' + \'Lb\' + \'js\' + \'\'];')) {
				found = true;
			}
			
		}
		
		if (startLine == -1 || endLine == -1) {
			callback('The URL cannot be decrypted');
			return;
		}
		
		var block = lines.slice(startLine, endLine);
		found = 0;
		var token;
		var authKey;
		
		for (i = 0; i < block.length && found < 3; i++) {
			line = block[i];
			
			// Find token
			if (line.trim().startsWith('Token')) {
				token = line.match(/Token: '([a-z0-9]+)',/)[1];
				found = 1;
				continue;
			}
			
			// Find auth key
			if (found == 1 && line.trim().startsWith('params')) {
				authKey = +line.match(/ = (\d+)/)[1];
				found = 2;
				continue;
			}
			
			// Find auth key salt
			if (found == 2 && line.trim().startsWith('params')) {
				var salt = +line.match(/ \+ (\d+);/)[1];
				authKey += salt;
				found = 3;
				continue;
			}
		}
		
		var url = 'http://www.linkbucks.com/intermission/loadTargetUrl?t=' + token + '&aK=' + authKey;
		
		setTimeout(function() {
			request(url, function(error, response, body) {
				if (error || response.statusCode != 200) {
					callback('The URL cannot be decrypted. Response code: ' + response.statusCode);
					return;
				}
				
				response = JSON.parse(body);
				if (response['Success'] === true && !response['AdBlockSpotted'] && response['Url']) {
					callback(null, response['Url']);
				}
				else {
					callback('The URL cannot be decrypted: ' + body);
				}
			});
		}, 5000);
		
	});
};

module.exports = service;
