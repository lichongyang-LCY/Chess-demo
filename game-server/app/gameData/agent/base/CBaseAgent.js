/**
 * Created by Class on 2017/3/22.
 */
require("../../../core/Core");

Class({
    ClassName:"Game.Agent.CBaseAgent",
    IsMineAction:false,
    MLastTime:0,
    ctor:function(uid)
    {
        Object.defineProperty(this, "UserId", {
            get: function () {
                return uid;
            }
        });
    },
    Controller:{
        value:false,
        key:__controller,
        get:function()
        {
            return this.__controller;
        },
        set:function(v)
        {
            if(v != this.__controller)
            {
                this.__controller = v;
                if(this.IsMineAction)
                {
                    if(v)
                    {
                        this.Action();
                    }
                    else
                    {
                        this.RemoveController();
                    }
                }
            }
        }
    },
    Action:function()
    {

    },
    RemoveController:function()
    {

    }

}).Static({
    Create:function(uid)
    {
        return new this(uid);
    }
})