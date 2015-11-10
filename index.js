var _url      = require('url');
var common    = require('./common.js');
var services  = require('./services.js');

/**
 * Bypasser class which handles expansion for one link
 * @param {String} url - URL to be expanded
 */
function Bypasser(url) {
	this.url = url;
	this.service = null;
	this.findService();
}

/**
 * Invoke _findService and set the result, if any
 * @return {Boolean} - Whether a matching service has been found
 */
Bypasser.prototype.findService = function() {
	var serv = Bypasser._findService(this.url);
	
	if (serv) {
		this.service = serv;
		return true;
	}
	else {
		return false;
	}
};

/**
 * Find a service matching the given URL
 * @param  {String} url - URL to be checked
 * @return {Service}      Found service, or null
 * @private
 */
Bypasser._findService = function(url) {
	var parsedUrl = _url.parse(url);
	if (parsedUrl.hostname == null) return null;
	
	var found = false;
	var genericService = null;
	var serv = null;
	
	// Loop through services until a match is found
	for (var i = 0; i < services.length && !found; i++) {
		serv = services[i];
		
		// Find a match among hostnames
		for (var j = 0; j < serv.hosts.length && !found; j++) {
			if (parsedUrl.hostname.endsWith(serv.hosts[j])) {
				found = true;
			}
		}
		
		// Assign Generic Service
		if (serv.name == 'Generic') {
			genericService = serv;
		}
	}
	
	// If a service is found, return it
	if (found) {
		return serv;
	}
	
	// Otherwise return the generic one
	return genericService;
};

/**
 * Decrypt the URL
 * @param  {Function} callback - Called when a result is ready
 */
Bypasser.prototype.decrypt = function(callback) {
	if (!this.service) {
		callback('This is not a valid url');
		return;
	}
	
	this.callback = callback;
	
	this.service.run(this.url, handleResponse.bind(this));
};

function handleResponse(err, res) {
	if (err) {
		return this.callback(err);
	}
	else {
		if (this.service.name == 'Generic') {
			// Search a new service
			this.url = res;
			this.findService();
			
			if (this.service.name != 'Generic') {
				this.service.run(this.url, handleResponse.bind(this));
				return;
			}
		}
		
		this.callback(null, res);
	}
}

module.exports = Bypasser;
