/**
 * Created by Class on 2017/3/7.
 */
require("../../core/Core");
require("../../core/CMapArray");
var enums = require("../../consts/enums");

Class({
    ClassName:"Game.Data.CBaseRoom",
    Persons:null,
    Roomer:null,
    PersonClass:null,
    RoomId:-1,
    MaxCount:3,
    m_pFreeSeats:null,
    CurrentActivity:0,
    m_pCurrentCount:{
        get:function()
        {
            return this.Persons.Ay.length;
        }
    },
    Channel:null,
    IsGameing:false,
    IsFull:{
        get:function()
        {
            return this.m_pCurrentCount == this.MaxCount;
        }
    },
    ChannelName:{
        get:function()
        {
            return "room_"+this.RoomId;
        }
    },
    ctor:function(id) {
        this.RoomId = id;
        this.Persons = new Core.mapArray("userid",[{"Seat":true}]);
        this.Channel = Core.app.get('channelService').getChannel(this.ChannelName, true);


    },
    FreeSeat:{
        get:function()
        {
            return this.m_pFreeSeats.pop();
        },
        set:function(v)
        {
            this.m_pFreeSeats.push(v);
        }
    },
    destruct:function()
    {
        Core.app.get('channelService').destroyChannel(this.ChannelName);
    },
    addPerson:function(uid,sid,data)
    {
        var p = null;
        if(!this.Persons.Map.hasOwnProperty(uid))
        {
            p = new this.PersonClass(uid,sid,this);
            if(!this.Roomer)
            {
                this.Roomer = uid;

            }
            else
            {
                var ay = this.Persons.Ay;
                for(var i =1;i<ay.length;i++)
                {

                }
            }
            p.Seat = this.FreeSeat;
            p.Data = data;
            this.Persons.InsertValue(p);
        }
        else
        {
            p = this.Persons.Map[uid].Value;
        }


        var res = {};
        res[enums.PUSH_KEY.ROOM_NEW_PERSON] = p;

        if(this.Persons.Ay.length>1)
            this.Channel.pushMessage(enums.PUSH_KEY.PUSH,res , function(err, res){ });

        this.Channel.add(uid,sid);
        return p;
    },
    removePerson:function(uid)
    {

        if(this.Persons.Map.hasOwnProperty(uid))
        {
            var person = this.Persons.Map[uid].Value, sid = person.sid;
            var seat = person.Seat;
            this.FreeSeat = seat;
            this.Channel.leave(uid,sid);
            this.Persons.RemoveValue(uid);
            person.$Dispose();


            if(this.m_pCurrentCount == 0)
            {
                Game.Data.CZJHDataCenter.Instance.ClearRoom(this.RoomId);
            }
            else
            {
                var value = {seat:seat};
                if(uid == this.Roomer)
                {
                    for(var key in this.Persons.Map)
                    {
                        this.Roomer = key;
                        value["roomer"] = key;
                        break;
                    }
                }
                if(this.Persons.Ay.length>0)
                {
                    var res = {};
                    res[enums.PUSH_KEY.ROOM_LEAVE_PERSON] = value;
                    this.Channel.pushMessage(enums.PUSH_KEY.PUSH,res , function(err, res){ });
                }

            }

        }



    },
    toJSON:function()
    {
        return {id:this.RoomId,roomer:this.Roomer,p:this.Persons};
    },
    ready:function(uid,r)
    {
        var person = this.Persons.Map[uid].Value;
        person.Ready = r;
        var res = {};
        res[enums.PUSH_KEY.USER_READY] = {seat:person.Seat,r:r};
        this.Channel.pushMessage(enums.PUSH_KEY.PUSH,res , function(err, res){ });
    },
    start:function()
    {
        this.IsGameing = true;
    },
    overGame:function(winners)
    {
        this.IsGameing = false;
    }

})