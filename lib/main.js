var util = require('util');
var key = "geheim";
var keyTwo = "supergeheim";

var s2pp = require('./s2pp.js');

var main = function(options, callbacks) {
	downloadKeyDatabase(function(data) {
		var nonce = s2pp.phaseTwoHash(data.tan,keyTwo);
		var database = s2pp.decrypt(key,nonce, data.database);
		console.log(util.inspect(database));
	});
};


var downloadKeyDatabase = function(callback) {
	var data = [{
		"url" : "http://tinco.nl",
		"password" : "geheim"
	}];
	s2pp.addEntropy();
	var tan = s2pp.nextTan();
	var nonce = s2pp.phaseTwoHash(tan,keyTwo);
	var encryptedData = s2pp.encryptKeyDatabase(key,tan,nonce,data);
	callback(encryptedData);
};

main();
