/*
	FastVideo
	Hosts: fastvideo.me
 */

var request = require('request');

var Service = require('../service.js');

var service = new Service('FastVideo');
service.hosts = ['fastvideo.me', 'rapidvideo.org'];

service.run = function(url, callback) {
	request(url, function(error, response, body) {
		if (error || response.statusCode != 200) {
			callback('Error while fetching the given URL. Response code: ' + response.statusCode);
			return;
		}
	
		var match;
		var form = {};
		
		var re = /<input type="hidden" name="(.+?)" value="(.*?)">/g;
		while ((match = re.exec(body))) {
			form[match[1]] = match[2];
		}
		
		match = body.match(/name="imhuman" value="(.+?)"/);
		if (match) {
			form['imhuman'] = match[1];
		}
				
		var options = {
			method: 'POST',
			uri: url,
			headers: {
				Cookie: 'file_id=155427; aff=4;',
				Referer: 'http://www.fastvideo.me/0gnpg3sfs3lj',
				Origin: 'http://www.fastvideo.me',
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36 OPR/38.0.2220.41'
			},
			form: form
		};
		
		request(options, function(error, response, body) {
			if (error || response.statusCode != 200) {
				callback('Error while fetching the given URL. Response code: ' + response.statusCode);
				return;
			}
			
			var match = body.match(/<script type='text\/javascript'>(.+?)\n<\/script>/);
			console.log(body);
			
			if (match) {
				// Unpack javascript
				var code;
				var env = {
					eval: function(c) {
						code = c;
					},
					window: {},
					document: {}
				};

				eval('with(env) {' + match[1] + '}');

				match = code.match(/file:"(.+?)"/);
				
				if (match) {
					callback(null, match[1]);
				}
				else {
					callback('The URL cannot be decrypted');
				}
			}
			else {
				callback('The URL cannot be decrypted');
			}
		});
	});
};

module.exports = service;
