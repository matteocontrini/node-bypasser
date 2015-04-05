var request = require('request');
var processor = require('./processor.js');
var Service = require('./service.js');

function Bypasser(url) {
	this.url = url;
	this.service = null;
	this.checkValidity();
}

Bypasser.prototype.checkValidity = function() {
	var serv = processor.findService(this.url);
	if (serv instanceof Service) {
		this.service = serv;
		return true;
	}
	else {
		return false;
	}
};

Bypasser.prototype.decrypt = function(callback) {
	if (!this.service) {
		callback('URL not recognized as supported');
		return;
	}
	
	this.service.run(this.url, callback);
};

module.exports = Bypasser;
