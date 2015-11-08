var expect = require('chai').expect;

var Bypasser = require('../index.js');

describe('Match URL to host', function() {
	it('Adf.ly', function() {
		var b = new Bypasser('http://adf.ly/pVVXg');
		expect(b.service.name).to.equal('Adf.ly');
	});
	
	it('Linkbucks', function() {
		var b = new Bypasser('http://www.linkbucks.com/Kutv');
		expect(b.service.name).to.equal('Linkbucks');
	});
	
	it('Shorte.st', function() {
		var b = new Bypasser('http://sh.st/gS8XD');
		expect(b.service.name).to.equal('Shorte.st');
	});
	
	it('AdFoc.us', function() {
		var b = new Bypasser('http://adfoc.us/x57045654');
		expect(b.service.name).to.equal('AdFoc.us');
	});

  it('Smsh.me', function() {
    var b = new Bypasser('http://smsh.me/3wqqf');
    expect(b.service.name).to.equal('Smsh.me');
  });

  it('P.pw', function() {
    var b = new Bypasser('http://p.pw/bai1hN');
    expect(b.service.name).to.equal('P.pw');
  });
	
	it('Generic goo.gl', function() {
		var b = new Bypasser('http://goo.gl/NWt4Es');
		expect(b.service.name).to.equal('Generic');
	});
	
	it('NowVideo', function() {
		var b = new Bypasser('http://www.nowvideo.li/video/6b3032d85873d');
		expect(b.service.name).to.equal('NowVideo');
	});
	
	it('NovaMov', function() {
		var b = new Bypasser('http://www.novamov.com/video/t1j3cls50rumq');
		expect(b.service.name).to.equal('NowVideo');
	});
});
