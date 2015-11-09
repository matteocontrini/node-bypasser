# node-bypasser 
[![Build Status](https://travis-ci.org/matteocontrini/node-bypasser.svg?branch=master)](https://travis-ci.org/matteocontrini/node-bypasser) 
[![npm version](https://badge.fury.io/js/node-bypasser.svg)](https://badge.fury.io/js/node-bypasser)

Bypass URL shortener websites

## Install

```
npm install --save node-bypasser
```

## Example:

```javascript
var Bypasser = require('node-bypasser');

var w = new Bypasser('http://adf.ly/1DX0XD');
w.decrypt(function(err, result) {
	console.log('Decrypted: ' + result);
});
```

The output will be 
```
Decrypted: https://github.com/matteocontrini/node-bypasser/
```

## Supported websites
* Adf.ly
* Linkbucks.com (main domain) (5 seconds required)
* Shorte.st (sh.st, u2ks.com, jnw0.com, digg.to, dh10thbvu.com)
* AdFoc.us
* Adf.ly
* Smsh.me
* P.pw
* LinkShrink.net
* Clk.im
* Link5s.com
* NowVideo and NovaMov (FLV video direct link will be extracted)
* All generic services that use simple 301/302 redirect (goo.gl, bit.ly, t.co,...)

## #next
* Bc.vc
* Some video streaming websites
* Unit tests
