/**
 * Created by Administrator on 2017/3/8.
 */
require("../../../base/Core");
Core.$Defines("Game.Const.CBaseUserData", global)({
    ChangeType:
    {
        "Add":1,
        "Del":2,
        "Modefy":3
    }
});

Class({
    ClassName:"Game.Data.CBaseUserData",
    Value:null,
    OldValue:null,
    NewValue:{
        set:function(a)
        {
            this.OldValue = this.OldValue == null? a: this.OldValue;
            this.Value = a;
            this.Notify();
        }
    },
    ctor:function()
    {
        var Observers = [];
        Object.defineProperty(this, "Observers", {
            get: function () { return Observers}
        });
        this.Value = this.factoryValue;
        this.init();
    },
    Clear:function()
    {
        if(this.Observers.length>0)
            this.Observers.splice(0,this.Observers.length-1);
        this.Value = this.factoryValue;
    },
    init:function()
    {
        console.warn("CBaseUserData must overwrite init fun");
    },

    AddObserver:function(fun,target)
    {
        cc.assert(target && (fun instanceof Function),"not found remove fun");
        this.Observers.push([target,fun])
        fun.call(target,this.Value,this.OldValue);
    },
    RemoveObserver:function(fun,target)
    {
        var ay = this.Observers;
        for(var i=0;i<ay.length;i++)
        {
            var observer = ay[i];
            if(observer[0] == target && observer[1] == fun)
            {
                ay.splice(i,1);
                return;
            }
        }
        cc.assert(false,"not found remove fun");
    },
    Notify:function()
    {
        var ay = this.Observers;
        var value = this.Value;
        var oldValue = this.OldValue;
        for(var i=0;i<ay.length;i++)
        {
            var observer = ay[i];
            observer[1].call(observer[0],value,oldValue);
        }
    }
})