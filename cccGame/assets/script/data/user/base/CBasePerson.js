/**
 * Created by Class on 2017/3/14.
 */
require("../../../base/Core");
require("./CBaseUserData");
Class({
    ClassName:"Game.Data.CBasePerson",
    Base:"Game.Data.CBaseUserData",
    factoryValue:{
        get:function(){

            return {};
        }
    },
    Seat:null,
    PersonInfo:{
        set:function(u)
        {
            for(var key in u)
            {
                this.Value[key] = u[key];
            }
            this.Notify();
        }
    },
    IsReady:{
        value:false,
        get:function()
        {
            return this.__ready;
        },
        set:function(v)
        {
            this.__ready = v;
            this.OldValue = "ready";
            this.Notify();
        }
    },
    IsAcivity:{

        set:function(v)
        {
            this.OldValue = "acivity";
            this.Notify();
        }
    },
    Clear:function()
    {
        for(var key in this.Value)
        {
            var temp = this.Value[key];
            temp.$Dispose();
        }
        this.__ready = false;
        Game.Data.CBaseUserData.prototype.Clear.apply(this,arguments);
    }
})