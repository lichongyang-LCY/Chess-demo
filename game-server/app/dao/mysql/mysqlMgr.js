/**
 * Created by root on 11/28/15.
 */
var mysqlMgr = module.exports;

var mysql = require("./mysql")
var mysqlMap = {};

mysqlMgr.init = function(app,opt,id)
{
    if(mysqlMap.hasOwnProperty(id))
    {
        return mysqlMap[id];
    }
    return mysqlMap[id] = mysql.init(app,opt,id);
}

mysqlMgr.shutdown = function()
{
    for(var key in mysqlMap)
    {
        mysqlMap[key].shutdown();
    }
}