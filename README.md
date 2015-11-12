# node-bypasser 
[![Build Status](https://travis-ci.org/matteocontrini/node-bypasser.svg?branch=master)](https://travis-ci.org/matteocontrini/node-bypasser) 
[![npm version](https://badge.fury.io/js/node-bypasser.svg)](https://badge.fury.io/js/node-bypasser)

Bypass URL shortener websites

## Install

```bash
npm install --save node-bypasser
```

## Example:

[Try on Tonic](https://tonicdev.com/npm/node-bypasser)

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

## Testing

```bash
npm run test
```
 
### Travis CI build is failing? 

Unit tests may occasionally fail when there are network connectivity issues or when services' servers give bad temporary responses.

## Supported websites
* Adf.ly
* Linkbucks.com (all alternative domains)
* Shorte.st (sh.st, u2ks.com, jnw0.com, digg.to, dh10thbvu.com)
* AdFoc.us
* Adf.ly
* Smsh.me
* P.pw
* LinkShrink.net
* Clk.im
* Link5s.com
* Bc.vc
* Oni.vn
* NowVideo and NovaMov (FLV video direct link will be extracted)
* All generic services that use simple 301/302 redirect (goo.gl, bit.ly, t.co,...)

## [Request a new service](https://github.com/matteocontrini/node-bypasser/issues)

## #next
* Some video streaming websites
