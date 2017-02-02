/*
	Bc.vc
	Hosts: bc.vc
 */

var request = require('request');

var Service = require('../service.js');

var service = new Service('Bc.vc');
service.hosts = ['bc.vc'];

service.run = function(url, callback) {
	request = request.defaults({ jar: true });

	request(url, function(error, response, body) {
		if (error || response.statusCode != 200) {
			callback('Error while fetching the given URL. Response code: ' + response.statusCode);
			return;
		}

		var match = body.match(/{\s*opt:\s*'make_log',\s*args:\s*{[:,\'\w\s]+}\s*}/);
		if (!match) {
			callback('The URL cannot be decrypted');
			return;
		}

		// Fix JSON response (http://qr.ae/d4PoJ)
		var payload = match[0];
		var toReplace = ['tZ', 'cW', 'cH', 'sW', 'sH'];
		toReplace.forEach(function(k) {
			payload = payload.replace(k, '""');
		});
		
		payload = payload.replace(/'/g, '"').replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');

		var params = JSON.parse(payload);

		var postUrl = 'http://bc.vc/fly/ajax.fly.php';
		var headers = {
			Host: 'bc.vc',
			Origin: 'http://bc.vc',
			Referer: url
		};

		var checks_log_option = {
			url: postUrl,
			form: { opt: 'checks_log' },
			headers: headers
		};

		var check_log_options = function() {
			params['opt'] = 'check_log';
			return {
				url: postUrl,
				form: params,
				headers: headers
			};
		};

		var make_log_options = function() {
			params['opt'] = 'make_log';
			return {
				url: postUrl,
				form: params,
				headers: headers
			};
		};

		var t = setInterval(function() {
			request.post(checks_log_option, function(error, response, body) {
				if (error || response.statusCode != 200) {
					callback('Error while fetching the given URL. Response code: ' + response.statusCode);
					clearInterval(t);
					return;
				}

				request.post(check_log_options(), function(error, response, body) {
					if (error || response.statusCode != 200) {
						callback('Error while fetching the given URL. Response code: ' + response.statusCode);
						clearInterval(t);
						return;
					}

					request.post(make_log_options(), function(error, response, body) {
						if (error || response.statusCode != 200) {
							callback('Error while fetching the given URL. Response code: ' + response.statusCode);
							clearInterval(t);
							return;
						}

						var res = JSON.parse(body);
						if (res.message && res.message.url.length > 1)
						{
							clearInterval(t);
							callback(null, res.message.url);
							return;
						}
					});
				});
			});
		}, 2000);
	});
};

module.exports = service;
