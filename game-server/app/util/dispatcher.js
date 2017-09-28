var crc = require('crc');

module.exports.dispatch = function(uid, connectors) {
	var index = Math.abs(crc.crc32(uid)) % connectors.length;
    console.log(" connectors.length:--------------"+ connectors.length);
    console.log(" index:--------------"+ index);
	return connectors[index];
};