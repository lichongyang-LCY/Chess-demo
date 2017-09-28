/**
 * Created by root on 3/4/17.
 */
var Core = require("../core/Core");
var http = require('http');
var url = require('url');
var consts = require('../consts/consts');

Class({
    ClassName:"Game.HttpServer.BaseHttp",
    m_App:null,
    m_Server:null,
    init:function(app,port)
    {
        this.m_App = app;
        this.m_Server = http.createServer(this.initHttpServers.bind(this));
        var self = this;
        this.m_Server.listen(port);
        this.m_Server.addListener("connection", function(socket){
            socket.setTimeout(5000);
        });
        process.on('SIGUSR1', self.serverClose.bind(this));
    },
    serverClose:function()
    {
        var self = this;
        if (self.m_Server === null) {
        } else {
            self.m_Server.close(function() {
                self.m_Server = null;
            });
        }
    },
    initHttpServers:function(req, res)
    {
        var urlInfo = url.parse(decodeURI(req.url),true);
        var reqInfo = urlInfo.query;
        var resback = this.resultBack(res);
        var funName = this.checkFuncs[urlInfo.pathname];
        if (!this.m_Server || !funName) {
            resback({code: consts.NOR_CODE.ERR_UNKNOWN});
            return;
        }
        this[funName](reqInfo,resback);
    },
    resultBack:function(res)
    {
        return function(result)
        {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            res.setHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            res.writeHead(200, "OK", {'Content-Type': 'text/html'});
            res.end(JSON.stringify(result));

        }
    }
})