/**
 * Created by root on 3/6/17.
 */
var mysql = require('mysql');
var pomelo = require('pomelo');
var sanitizer = require('sanitizer');
var accountDao = module.exports;
accountDao.getDataByAcc = function(acc,cb)
{
    var sql = 'select * from accounts where `account` = ?';
    var args = [sanitizer.sanitize(acc)];

    pomelo.app.get("dbMgr").query(sql, args, cb);
}

accountDao.CreateData = function(acc,pwd,cb)
{
    var sql = 'insert into accounts(`account`, `password`) values (?,?)';
    var args = [sanitizer.sanitize(acc), sanitizer.sanitize(pwd)];

    pomelo.app.get('dbMgr').insert(sql, args, cb);
}