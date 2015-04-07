var services = require('./services');
var common = require('./common.js');
var url = require('url');

function findService(urlString) {
	var urlobj = url.parse(urlString);
	if (urlobj.hostname == null) return null;
	
	var found = false;
	for (var i = 0; i < services.length && !found; i++) {
		var serv = services[i];
		for (var j = 0; j < serv.hosts.length && !found; j++) {
			if (urlobj.hostname.endsWith(serv.hosts[j])) {
				found = true;
			}
		}
	}
	
	if (found) {
		return serv;
	}
	
	return null;
}

module.exports.findService = findService;
