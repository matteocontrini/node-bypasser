var services = require('./services');

function findService(url) {
	for (var i = 0; i < services.length; i++) {
		var serv = services[i];
		if (serv.rule.test(url)) {
			return serv;
		}
	}
	
	return null;
}

module.exports.findService = findService;
