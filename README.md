# node-bypasser
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
* Shorte.st (sh.st)
* AdFoc.us
* NowVideo and NovaMov decryption (FLV video direct link will be extracted)

## Coming soon
```
// TODO bit.ly
// TODO goo.gl
```
