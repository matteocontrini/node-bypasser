var findLastMatch = function(regex, text) {
	var lastMatch = null;
	var m;
	while ((m = regex.exec(text)) != null) {
		lastMatch = m;
	}
	
	return lastMatch;
};

String.prototype.endsWith = function(suffix) {
	return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.startsWith = function(prefix) {
	return this.indexOf(prefix) === 0;
};

module.exports.findLastMatch = findLastMatch;
