/**
 * Created by Class on 2017/3/7.
 */
require("./CZJHCard");
require("../CBasePerson");
var enums = require("../../../consts/enums");

Class({
    ClassName: "Game.Data.CZJHPerson",
    Base: "Game.Data.CBasePerson",
    CardsSortKeys:[{"Num":false}],
    CardClass:Game.Data.CZJHCard,
    Point:0,
    Radix:{
        get:function()
        {
            return this.CardsSaw?2:1;
        }
    },
    CardsSaw:false,
    Type:{
        key:"__type",
        value:0,
        get:function()
        {
            if(!this.__type)
            {

                var t = this.CheckBZ();
                if(0 === t)
                {
                    t = this.CheckTH() | (this.CheckSZ() || this.CheckSZTS());
                    if(0 === t)
                    {
                        t = this.CheckDZ();
                        if(0 === t)
                        {
                            t = this.CheckTS();
                            if(0 === t)
                            {
                                t = Game.Data.CZJHPerson.Types.DN;
                            }
                        }
                    }
                }
                this.__type = t;
            }
            return this.__type;
        }
    },
    Reset:function()
    {
        this.CardsSaw = false;
        this.Cards.RemoveAll();
    },
    CheckBZ:function()
    {
        var ay = this.Cards.Ay;
        return (ay[1].Num == ay[0].Num && ay[0].Num== ay[2].Num)? Game.Data.CZJHPerson.Types.BZ : 0;

    },
    CheckTH:function()
    {
        var ay = this.Cards.Ay;
        return (ay[1].Color == ay[0].Color && ay[0].Color== ay[2].Color)? Game.Data.CZJHPerson.Types.TH : 0
    },
    CheckSZ:function()
    {
        var ay = this.Cards.Ay;
        return (ay[0].Num + ay[2].Num == 2*ay[1].Num && ay[0].Num -ay[1].Num == 1 )? Game.Data.CZJHPerson.Types.SZ : 0;
    },
    CheckSZTS:function()
    {
        var ay = this.Cards.Ay;
        return (ay[0].Num == 14 && ay[1].Num == 3 && ay[2].Num == 2)? Game.Data.CZJHPerson.Types.SZ : 0;
    },
    CheckDZ:function()
    {
        var ay = this.Cards.Ay;
        return (ay[1].Num == ay[0].Num || ay[1].Num== ay[2].Num || ay[2].Num== ay[0].Num)? Game.Data.CZJHPerson.Types.BZ : 0;
    },
    CheckDN:function()
    {
        return Game.Data.CZJHPerson.Types.DN;
    },
    CheckTS:function()
    {
        var ay = this.Cards.Ay;
        return (ay[2].Num === 2 &&ay[1].Num === 3 || ay[0].Num === 5)? Game.Data.CZJHPerson.Types.TS : 0;
    },
    seeCards:function()
    {
        this.CardsSaw = true;
        var rs = [{'uid':this.userid,sid:this.sid}];
        var info = {};
        info[enums.PUSH_KEY.GAME_ZJH.SEE_CARDS]=this.Cards;
        Core.app.get('channelService').pushMessageByUids(enums.PUSH_KEY.PUSH, info, rs, function(){});
    },
    Auto:function()
    {
        Game.Data.CBasePerson.prototype.Auto.apply(this);
        this.Room.giveup(this.userid);
    }

}).Static({
    //
    Types:{
        BZ:0x1<<6,
        TH:0x1<<5,
        SZ:0x1<<4,
        SZTS:0x1<<3,
        DZ:0x1<<2,
        DN:0x1<<1,
        TS:0x1
    },
    CMP:function(a,b)
    {
        if(a.Type === b.Type)
        {
            var aAy = a.Cards.Ay,bAy = b.Cards.Ay;
            var resault = 0;
            for(var i=0;i<3;i++)
            {
                resault = aAy[i].Num - bAy[i].Num;
                if(!!resault )
                    break;
            }
            return resault;
        }
        else
        {
            return a.Type - b.Type;
        }


    },
    CMPTS:function(a,b)
    {
        var aAy = a.Cards.Ay,bAy = b.Cards.Ay;
        if(a.Type === this.Types.BZ && aAy[0].Num === 14 && b.Type === this.Types.TS)
            return -1;
        if(b.Type === this.Types.BZ && bAy[0].Num === 14 && a.Type === this.Types.TS)
            return 1;

        return 0;
    },
    ALLCMP:function(a,b)
    {
        var r = this.CMPTS(a,b);
        if(0!=r)
        {
            return r;
        }
        return this.CMP(a,b);
    }
});