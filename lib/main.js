var util = require('util');
var key = "geheim";
var keyTwo = "supergeheim";

var s2pp = require('./s2pp.js');

var main = function(options, callbacks) {
	downloadKeyDatabase(function(data) {
		var nonce = s2pp.phaseTwoHash(data.tan,keyTwo);
		var database = JSON.parse(s2pp.decrypt(key,nonce, data.database));
		nonce = s2pp.phaseTwoHash(database[0].tan, keyTwo);
		var password = s2pp.decrypt(key, nonce, database[0].password);
		console.log(password);
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
  data[0].password = s2pp.encrypt(key,nonce,data[0].password);
	data[0].tan = tan;
	tan = s2pp.nextTan();
	nonce = s2pp.phaseTwoHash(tan,keyTwo);
	var encryptedData = s2pp.encryptKeyDatabase(key,tan,nonce,data);
	callback(encryptedData);
};

main();
