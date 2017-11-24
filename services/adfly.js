/*
	Adf.ly
	Hosts: adf.ly
*/

var request = require('request');

var Service = require('../service.js');

var service = new Service('Adf.ly');
service.hosts = ['adf.ly'];

service.run = function(url, callback) {
	request(url, function(error, response, body) {
		if (error || response.statusCode != 200) {
			callback('Error while fetching the given URL. Response code: ' + response.statusCode);
			return;
		}
		
		var match = body.match(/var ysmm = '(.*?)';/);
		if (match) {
			var ysmm = match[1];
			var a = '';
			var b = '';
			for (var i = 0; i < ysmm.length; ++i) {
				if (i % 2 === 0) {
					a = a + ysmm.charAt(i);
				} else {
					b = ysmm.charAt(i) + b;
				}
			}
			ysmm = a + b;
			a = ysmm.split('');
			for (var i = 0; i < a.length; ++i) {
				if (/\d/.test(a[i])) {
					for (var j = i + 1; j < a.length; ++j) {
						if (/\d/.test(a[j])) {
							b = a[i] ^ a[j];
							if (b < 10) {
								a[i] = b;
							}
							i = j;
							j = a.length;
						}
					}
				}
			}
			
			ysmm = a.join('');
			ysmm = new Buffer(ysmm, 'base64').toString('ascii');
			ysmm = ysmm.substring(16);
			ysmm = ysmm.substring(0, ysmm.length - 16);
			
			callback(null, ysmm);
		}
		else {
			callback('The URL cannot be decrypted');
			return;
		}
	});
};

module.exports = service;
