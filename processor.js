var services = require('./services');
var url = require('url');

function findService(urlString) {
	var urlobj = url.parse(urlString);
	var found = false;
	for (var i = 0; i < services.length && !found; i++) {
		var serv = services[i];
		for (var i = 0; i < serv.hosts.length && !found; i++) {
			if (urlobj.hostname.endsWith(serv.hosts[i])) {
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

String.prototype.endsWith = function(suffix) {
	return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
