const Bypasser = require('node-bypasser');

var w = new Bypasser('http://adf.ly/1DX0XD');
w.decrypt(function(err, result) {
	if (err) {
		console.log(err);
		return;
	}
	
	console.log('Decrypted: ' + result);
});
