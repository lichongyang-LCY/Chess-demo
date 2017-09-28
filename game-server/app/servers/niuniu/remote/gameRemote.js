/**
 * Created by root on 3/21/17.
 */
var consts = require('../../../consts/consts');
var Token = require('../../../util/token');
require('../../../base/CBaseRemote');
require('../../../gameData/game/niuniu/CNNDataCenter');


Class({
    ClassName:"CPomelo.Remote.CNNRemote",
    Base:"CPomelo.Remote.CBaseRemote",
    DataCenter:null,
    uid2Roomid:function(uid)
    {
        var p = this.DataCenter.Persons[uid];
        return p?p.RoomId:-1;

    },
    init:function(next)
    {
        next();
        Core.app = this.app;
        this.DataCenter = Game.Data.CNNDataCenter.Instance;
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
            this.DataCenter.Rooms[rid].ready(uid,ready?1:0);
        next();
    },
    start:function(uid, next)
    {
        var rid = this.uid2Roomid(uid);
        if(rid>0)
        {
            var room = this.DataCenter.Rooms[rid];
            if(uid == room.Roomer && !room.IsGameing && room.isReady)
            {
                this.DataCenter.Rooms[rid].start();
            }
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
    return new CPomelo.Remote.CNNRemote(app);
};