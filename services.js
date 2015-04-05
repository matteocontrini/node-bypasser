var Service = require('./service.js');
var request = require('request');

var services = [];

var s = new Service("Adf.ly");
s.hosts = ['adf.ly'];
s.run = function(url, callback) {
	request(url, function(error, response, body) {
		if (error || response.statusCode != 200) {
			callback('Errore while fetching the given URL. Response code: ' + response.statusCode);
			return;
		}
		
		var match = body.match(/var ysmm = '(.*?)';/);
		if (match) {
			var ysmm = match[1];
			var i = ysmm.indexOf('!HiTommy');
			if (i > -1) {
				ysmm = ysmm.substring(0, i);
			}
			
			// Decrypt `ysmm`
			var z = f = '';

			for (var l = 0; l < ysmm.length; l++) { 
				if (l % 2 == 0) { 
					f += ysmm.charAt(l); 
				}
				else { 
					z = ysmm.charAt(l) + z; 
				} 
			}

			ysmm = f + z; 
			ysmm = new Buffer(ysmm, 'base64').toString('ascii'); 
			ysmm = ysmm.substring(2);
			
			callback(null, ysmm);
		}
		else {
			callback('The URL cannot be decrypted');
			return;
		}
	});
};
services.push(s);

// TODO linkbucks.com
// TODO sh.st
// TODO adfoc.us
// TODO bit.ly
// TODO goo.gl

module.exports = services;
