require("./pomelo");
Class({
    ClassName:"Game.Net.CWebSocket",
    state:0,
    pomelo:window.pomelo,
    ctor:function()
    {
        this.initPomelo();
    },
    IsOpened:function()
    {
        return this.state==1;
    },
    initPomelo:function()
    {
        var self = this;
        var map = {
            "close":self.close.bind(this),
            "disconnect":self.ondisconnect.bind(this),
            "io-error":this.onerror.bind(this),
            "reconnect":null,
            "error":self.onerror.bind(this),
            "onKick":function()
            {
                self.ondisconnect({code:1})
            },
            "heartbeat timeout":function()
            {
                self.ondisconnect({code:1000})
            },
            "push":self.onServerPushMsg.bind(self)
        };

        for(var key in map)
        {
            if(map[key])
            {
                this.pomelo.removeListener(key,map[key]);
                this.pomelo.addListener(key,map[key]);
            }
        }
    },
    onServerPushMsg:function(msg)
    {
        var key = null;
        for( key in msg)
        {
            break;
        }
        if(key)
        {
            var c = msg[key];
            this.onMessage(key,c);
        }
    },
    beginConnect:function(host,port,cb,t)
    {
        var self = this;
        var pomelo = self.pomelo;
        //if(self.IsOpened())
        //{
        //    Server.disconnect();
        //}

        if(self.state == 0)
        {
            pomelo.init({
                host: host,
                port: port,
                log: true,
                reconnect:true
            }, function() {
                self.state = 1;
                cb &&(t?cb.apply(t):cb());
            });


            return;
        }
        Server.disconnect();
        //Class.Assert(0,"server connected!");
    },
    disconnect:function()
    {
        if(this.IsOpened())
        {
            var pomelo = this.pomelo;
            pomelo.disconnect();
            this.close();
        }
    },

    Send:function(route,vMap,id,payloadName,cb,notify)
    {
        if(this.state == 1)
        {
            if(1 == notify)
            {
                this.pomelo.notify(route, vMap);
            }
            else
            {
                this.pomelo.request(route, vMap, function(data) {
                    Server.onmessage(data,id,payloadName,vMap,notify,cb);
                });
            }
        }
        else{
            Server.onfaildsend(notify);
        }
    },
    onMessage:function(key,data)
    {
        data = data || {};
        data.ID = key;
        data.payloadName = key;
        data.timestamp?0:data.timestamp = 0;
        Client.dispatch(data, null);
        delete data.ID;
        delete data.payloadName;
        delete data.timestamp;
    },
    ondisconnect:function(msg)
    {
        if(msg.code != 1)
        {
            Server.ondisconnect();
        }
    },
    onerror:function()
    {

    },
    close:function()
    {
        this.state = 0;
    }
}).Static({
    Instance:Core.Instance
})