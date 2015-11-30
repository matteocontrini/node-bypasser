/*jshint expr: true*/
var expect = require('chai').expect;

var Bypasser = require('../index.js');

describe('Oxyl.me', function() {
	this.timeout(0);

	it('should be matched', function() {
		var b = new Bypasser('http://oxyl.me/LDwTsYR');
		expect(b.service.name).to.equal('Oxyl.me');
	});

	it('should be descrypted', function(done) {
		var b = new Bypasser('http://oxyl.me/LDwTsYR');
		b.decrypt(function(err, result) {
			expect(err).to.be.null;
			expect(result).to.equal('http://github.com');
			done();
		});
	});

	it('should be descrypted with multiple links', function(done) {
		var b = new Bypasser('http://oxyl.me/loTmNzZ');
		var links = ['https://github.com', 'https://github.com/matteocontrini/node-bypasser'];

		b.decrypt(function(err, result) {
			expect(err).to.be.null;
			expect(result.sort).to.equal(links.sort);
			done();
		});
	});
});
