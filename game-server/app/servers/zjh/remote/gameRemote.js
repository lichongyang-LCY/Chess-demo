/**
 * Created by Class on 2017/3/7.
 */
var consts = require('../../../consts/consts');
var Token = require('../../../util/token');
require('../../../base/CBaseRemote');
require('../../../gameData/game/zjh/CZJHDataCenter');


Class({
    ClassName:"CPomelo.Remote.CZJHRemote",
    Base:"CPomelo.Remote.CBaseRemote",
    DataCenter:null,
    uid2Roomid:function(uid)
    {
        var p = this.DataCenter.Persons[uid];
        console.log(this.DataCenter.Persons)
        return p?p.RoomId:-1;

    },
    init:function(next)
    {
        next();
        Core.app = this.app;
        this.DataCenter = Game.Data.CZJHDataCenter.Instance;
    },
    join:function(rid,uid,sid, next)
    {
        var self = this;
        self.app.rpc.db.dbRemote.GetUser(null,uid,function(err,data)
        {
            if(!err)
            {
                rid = self.DataCenter.intoRoom(uid,rid,sid,data);
                if(rid>0)
                {
                    var roomInfo = self.DataCenter.Rooms[rid];
                    next(null, {r: roomInfo});
                    return;
                }
            }

            next(null, {code: consts.LOGIN.LOGIN_TOKEN_ERR});
            return;

        });

    },
    ready:function(uid,ready, next)
    {

        var rid = this.uid2Roomid(uid);
        if(rid>0)
        {
            this.DataCenter.Rooms[rid].ready(uid,ready?1:0);
        }
        next();
    },
    start:function(uid, next)
    {
        console.warn("star");
        var rid = this.uid2Roomid(uid);
        if(rid>0)
        {
            console.warn("star2");
            var room = this.DataCenter.Rooms[rid];
            if(uid == room.Roomer && !room.IsGameing && room.isReady)
            {
                this.DataCenter.Rooms[rid].start();
            }
        }

        next();
    },

    giveup:function(uid, next)
    {
        var rid = this.uid2Roomid(uid);
        if(rid>0)
        {
            var room = this.DataCenter.Rooms[rid];
            this.DataCenter.Rooms[rid].giveup(uid);
        }
        next();
    },
    follow:function(point, uid, next)
    {
        var rid = this.uid2Roomid(uid);
        if(rid>0)
        {
            var room = this.DataCenter.Rooms[rid];
            this.DataCenter.Rooms[rid].follow(uid,point);
        }
        next();
    },
    seeCards:function(uid, next)
    {
        var rid = this.uid2Roomid(uid);
        if(rid>0)
        {
            var room = this.DataCenter.Rooms[rid];
            this.DataCenter.Rooms[rid].seeCards(uid);
        }
        next();
    },
    open:function( uid, next)
    {
        var rid = this.uid2Roomid(uid);
        if(rid>0)
        {
            var room = this.DataCenter.Rooms[rid];
            this.DataCenter.Rooms[rid].open(uid);
        }
        next();
    },
    onUserLeave:function(uid, next)
    {
        next();
        var rid = this.uid2Roomid(uid);
        if(rid>0)
        {
            this.DataCenter.removePerson(uid,rid);
        }

    }
})

module.exports = function(app) {
    return new CPomelo.Remote.CZJHRemote(app);
};