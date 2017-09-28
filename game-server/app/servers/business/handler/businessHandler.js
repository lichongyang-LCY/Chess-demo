/**
 * Created by root on 3/21/17.
 */
var consts = require('../../../consts/consts');
require('../../../base/CBaseHandler');


Class({
    ClassName:"CPomelo.Handler.businessHandler",
    Base:"CPomelo.Handler.CBaseHandler",
    join:function(msg, session, next)
    {
        var server = consts.Games[msg.g] ;
        if(!server)
        {
            next(null,{});
            return;
        }
        this.app.rpc[server].gameRemote.join(null,msg.rid,session.uid,session.frontendId ,next)

    },
    ready:function(msg, session, next)
    {
        var server = consts.Games[msg.g] ;
        if(!server)
        {
            next(null,{});
            return;
        }
        this.app.rpc[server].gameRemote.ready(null,session.uid,msg.r ,next)
    },
    start:function(msg, session, next)
    {
        var server = consts.Games[msg.g] ;
        if(!server)
        {
            next(null,{});
            return;
        }
        this.app.rpc[server].gameRemote.start(null,session.uid ,next)
    },
    giveup:function(msg, session, next)
    {
        var server = consts.Games[msg.g] ;
        if(!server)
        {
            next(null,{});
            return;
        }
        this.app.rpc[server].gameRemote.giveup(null,session.uid ,next)
    },
    follow:function(msg, session, next)
    {
        var server = consts.Games[msg.g] ;
        if(!server)
        {
            next(null,{});
            return;
        }
        this.app.rpc[server].gameRemote.follow(null,msg.p,session.uid ,next)
    },
    see:function(msg, session, next)
    {
        var server = consts.Games[msg.g] ;
        if(!server)
        {
            next(null,{});
            return;
        }
        this.app.rpc[server].gameRemote.seeCards(null,session.uid ,next)
    },
    open:function(msg, session, next)
    {
        var server = consts.Games[msg.g] ;
        if(!server)
        {
            next(null,{});
            return;
        }
        this.app.rpc[server].gameRemote.open(null,session.uid ,next);
    }

})

module.exports = function(app) {
    return new CPomelo.Handler.businessHandler(app);
};