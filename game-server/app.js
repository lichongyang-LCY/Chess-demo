var fs = require('fs');
var pomelo = require('pomelo');
require('./app/httpServer/login');
var mysqlMgr = require("./app/dao/mysql/mysqlMgr");
var mysqlName="cccGame";
/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'server');
//开启监控模块
app.configure(function () {
    app.enable('systemMonitor');
});
// app configuration
app.configure('production|development', 'connector', function(){
    app.set('connectorConfig',
        {
            connector : pomelo.connectors.hybridconnector,
            heartbeat : 3,
            useDict : true,
            useProtobuf : true,
            //ssl: {
            //  type: 'wss',
            //	key: fs.readFileSync('../shared/server.key'),
            //	cert: fs.readFileSync('../shared/server.crt')
            //}
        });
});
app.configure('production|development', function(){
    app.loadConfig(mysqlName,app.getBase()+"/config/mysql.json");
});
app.configure('production|development', 'manager', function(){

    Game.HttpServer.Login.CreateMore(app,1);
});
app.configure('production|development', 'manager|db', function(){

    var dbMgr = mysqlMgr.init(app,mysqlName,1);
    app.set("dbMgr",dbMgr);
});
// start app
app.start();

process.on('uncaughtException', function (err) {
    console.error(' Caught exception: ' + err.stack);
});