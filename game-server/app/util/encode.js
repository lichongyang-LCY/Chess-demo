/**
 * Created by root on 3/7/17.
 */
var crypto = require("crypto");
var Buffer = require("buffer").Buffer;

var encode = module.exports;

encode.md5 = function(data){
    var buf = new Buffer(data);
    var str = buf.toString("binary");
    return crypto.createHash("md5").update(str).digest("hex");
}