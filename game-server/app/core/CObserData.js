/**
 * Created by Administrator on 2016/11/24.
 */

Class({
    ClassName:"Core.obserData",
    m_pNotifyMap:null,
    m_pNotifying:false,
    ctor:function()
    {
        this.m_pNotifying = false;
        this.m_pNotifyMap = [];
        this.m_pRemoveNotifys = [];

    },


    clearRemoveNotifys:function()
    {
        for(var i=this.m_pRemoveNotifys.length-1;i>-1;i--)
        {
            this.m_pNotifyMap.splice(this.m_pRemoveNotifys[i],1);
        }
    },
    Notify:function(value,c)
    {
        this.m_pNotifying = true;
        for(var i=0;i<this.m_pNotifyMap.length;i++)
        {
            var temp = this.m_pNotifyMap[i];
            temp[1].apply(temp[0],arguments);
        }
        this.m_pNotifying = false;

        this.clearRemoveNotifys();

    },
    AddNotify:function(t,cb)
    {
        for(var i=0;i<this.m_pNotifyMap.length;i++)
        {
            var temp = this.m_pNotifyMap[i];
            if(temp[0] == t && temp[1] == cb)
            {
                console.error("this notify have added...");
                return;
            }
        }
        this.m_pNotifyMap.push([t,cb])
    },
    RemoveNotify:function(t,cb)
    {

        for(var i=0;i<this.m_pNotifyMap.length;i++)
        {
            var temp = this.m_pNotifyMap[i];
            if(temp[0] == t && temp[1] == cb)
            {
                this.m_pRemoveNotifys.push(i);
            }
        }

        if(!this.m_pNotifying)
        {
            this.clearRemoveNotifys();
        }

    },
    clearNotify:function()
    {
        this.m_pNotifyMap = [];
        this.m_pRemoveNotifys = [];
    }
})

//// key-value
Core.obserValueData = Core.obserData.extend({

    ctor:function(keys)
    {
        this._super();
        var value = {};
        var self = this;
        keys.forEach(function(key)
        {
            value[key] = 0;

            Object.defineProperty(self, key, {
                get: function () { return value[key] }
            });
        })

        Object.defineProperty(self, "Value", {
            get: function () { return value}
        });

        Object.defineProperty(self, "Change", {
            set: function (v) {
                var notify = false;
                for(var key in v)
                {
                    if(value[key] != v[key])
                    {
                        value[key] = v[key]
                        notify = true;
                    }
                }
                if(notify)
                {
                    this.Notify(value,v);
                }

            }
        });

    }
})

Core.obserMapAyData =  Core.obserData.extend({
    ctor:function(key,skeys)
    {
        var value = new Core.mapArry(key,skeys);
        Object.defineProperty(this, "Value", {
            get: function () { return value}
        });
    }
})
