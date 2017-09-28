/**
 * Created by Class on 2017/3/14.
 */
require("../../../base/Core");
require("./CBaseUserData");
Class({
    ClassName:"Game.Data.CBaseRoom",
    Base:"Game.Data.CBaseUserData",
    factoryValue:{
        get:function(){

            return {};
        }
    },
    Roomer:null,
    RoomID:0,
    PersonClass:null,
    m_pCurrentCount:0,
    SelfSeat:null,
    SelfPerson:{
        get:function()
        {
            return this.Value[this.SelfSeat];
        }
    },
    IsFull:{
        get:function()
        {
            return this.m_pCurrentCount == this.MaxCount;
        }
    },
    CurrentActivity:0,
    addPerson:function(data)
    {
        var seateid = data.seat;
        if(seateid == undefined)
            return;
        if(!this.Value.hasOwnProperty(seateid))
        {
            var p = new this.PersonClass();
            p.PersonInfo = {
                "seat":data.seat,
                "name":data.name+data.userid,
                "userid":data.userid,
                "sex":data.sex,
                "point":data.point
            };
            this.Value[seateid] = p;
            this.m_pCurrentCount++;

            if(data.userid == Game.Data.CDataCenter.Instance.User.Value.userid)
            {
                this.SelfSeat = seateid;
            }
        }


        this.Notify();
        return p;

    },
    removePerson:function(seateid,newRoomer)
    {
        var p = this.Value[seateid];
        if(newRoomer)
        {
            this.Roomer = newRoomer;
        }
        if(p)
        {
           delete this.Value[seateid];
            p.$Dispose();
            this.m_pCurrentCount--;
        }


        this.Notify();

    },
    Clear:function()
    {
        for(var key in this.Value)
        {
            var temp = this.Value[key];
            temp.Clear();
            temp.$Dispose();
        }
        this.Roomer = undefined;
        this.m_pCurrentCount = 0;
        Game.Data.CBaseUserData.prototype.Clear.apply(this,arguments);
    }
})