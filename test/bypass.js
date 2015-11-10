/*jshint expr: true*/
var expect = require('chai').expect;

var Bypasser = require('../index.js');

describe('Decrypt', function() {
	this.timeout(0);
	
	it('Adf.ly', function(done) {
		var b = new Bypasser('http://adf.ly/pVVXg');
		b.decrypt(function(err, result) {
			expect(err).to.be.null;
			expect(result).to.equal('http://github.com');
			done();
		});
	});
	
	it('Linkbucks', function(done) {
		var b = new Bypasser('http://www.linkbucks.com/Kutv');
		b.decrypt(function(err, result) {
			expect(err).to.be.null;
			expect(result).to.equal('http://github.com');
			done();
		});
	});
	
	it('Shorte.st', function(done) {
		var b = new Bypasser('http://sh.st/gS8XD');
		b.decrypt(function(err, result) {
			expect(err).to.be.null;
			expect(result).to.equal('http://github.com');
			done();
		});
	});
	
	it('AdFoc.us', function(done) {
		var b = new Bypasser('http://adfoc.us/x57045654');
		b.decrypt(function(err, result) {
			expect(err).to.be.null;
			expect(result).to.equal('http://github.com');
			done();
		});
	});
	
	it('Smsh.me', function(done) {
		var b = new Bypasser('http://smsh.me/3wqqf');
		b.decrypt(function(err, result) {
			expect(err).to.be.null;
			expect(result).to.equal('https://github.com/matteocontrini/node-bypasser'); // Can't shrink http://github.com
			done();
		});
	});
	
	it('P.pw', function(done) {
		var b = new Bypasser('http://p.pw/bai1hN');
		b.decrypt(function(err, result) {
			expect(err).to.be.null;
			expect(result).to.equal('http://github.com');
			done();
		});
	});
	
	it('LinkShrink.net', function(done) {
		var b = new Bypasser('http://linkshrink.net/7znHwW');
		b.decrypt(function(err, result) {
			expect(err).to.be.null;
			expect(result).to.equal('http://github.com');
			done();
		});
	});
	
	it('Clk.im', function(done) {
		var b = new Bypasser('http://clk.im/A358O');
		b.decrypt(function(err, result) {
			expect(err).to.be.null;
			expect(result).to.equal('http://github.com');
			done();
		});
	});
	
	it('Link5s.com', function(done) {
		var b = new Bypasser('http://link5s.com/Gmq');
		b.decrypt(function(err, result) {
			expect(err).to.be.null;
			expect(result).to.equal('http://github.com');
			done();
		});
	});
	
	it('Generic goo.gl', function(done) {
		var b = new Bypasser('http://goo.gl/NWt4Es');
		b.decrypt(function(err, result) {
			expect(err).to.be.null;
			expect(result).to.equal('http://github.com/');
			done();
		});
	});
	
	it('Generic custom bit.ly', function(done) {
		var b = new Bypasser('http://l.khoanguyen.me/1HBv4tx');
		b.decrypt(function(err, result) {
			expect(err).to.be.null;
			expect(result).to.equal('http://github.com/');
			done();
		});
	});
	
	it('NowVideo', function(done) {
		var b = new Bypasser('http://www.nowvideo.li/video/6b3032d85873d');
		b.decrypt(function(err, result) {
			expect(err).to.be.null;
			expect(result.slice(-4)).to.equal('.flv');
			done();
		});
	});
	
	it('NovaMov', function(done) {
		var b = new Bypasser('http://www.novamov.com/video/4bb1ba486069a');
		b.decrypt(function(err, result) {
			expect(err).to.be.null;
			expect(result.slice(-4)).to.equal('.flv');
			done();
		});
	});

  	it('Throw error when receive invalid URL', function(done) {
    	var b = new Bypasser('github.com');
    	b.decrypt(function(err, result) {
      	expect(err).to.equal('This is not a valid url');
      	done();
    });
  });
});
