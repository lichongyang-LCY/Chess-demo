/**
 * Created by Administrator on 2016/11/24.
 */
var Core = require("./Core");
Core.mapArrayHelper = {
    arrayInsert:function(skeys,list,value,from,to)
    {
        var idx = this.binarySearchIndex(skeys,list,value,from,to);
        list.splice(idx,0,value);
        return idx;
    },
    binarySearchIndex:function(skeys,list,temp,iBegin,iEnd)
    {
        var middle = -1;
        while (iBegin <= iEnd)
        {
            middle = parseInt((iBegin + iEnd) / 2);
            /// < middle
            if (this.compare(skeys,list[middle],temp) >0)
            {
                iEnd = middle - 1;
            }
            else
            {
                //
                iBegin = middle + 1;
            }
        }

        return iBegin;
    },
    compare:function(skeys,n,t)
    {
        for(var i=0;i<skeys.length;i++ )
        {
            var temp = skeys[i],key = temp[0],cv = temp[1],c = t[key] == n[key];
            if(!c)
                return (t[key]>n[key]) == cv ?1 : -1;
        }
        return -1;
    },
    CType:{
        UPDATE:0,
        ADD:1,
        DEL:2
    }

}
Class({
    ClassName:"Core.mapArray",
    ctor:function(key,skeys)
    {
        var maps = {};
        var ay = [];
        var self = this;
        var nkeys = [];
        for(var i=0;i<skeys.length;i++)
        {
            var tempsort = skeys[i];
            for(var skey in tempsort)
            {
                nkeys.push([skey,tempsort[skey]])
                break;
            }
        }
        Object.defineProperty(self, "Map", {
            get: function () { return maps}
        });
        Object.defineProperty(self, "Ay", {
            get: function () { return ay}
        });
        Object.defineProperty(self, "m_pKey", {
            value:key,
            configurable:true,
            writable:false

        });
        Object.defineProperty(self, "m_pSortKeys", {
            value:nkeys,
            configurable:true,
            writable:false
        });

    },
    InsertOrModify:function(value)
    {
        var map = this.Map;
        var key = value[this.m_pKey];
        if(map.hasOwnProperty(key))
        {
            this.RemoveValue(key,true);
            this.InsertValue(value,true)
            this.afterModify(key,map[key].Index,value);
        }
        else
        {
            this.InsertValue(value);
        }
    },
    ModifyValue:function(value)
    {
        var map = this.Map;
        var key = value[this.m_pKey];
        if(map.hasOwnProperty(key))
        {
            this.RemoveValue(key,true);
            this.InsertValue(value,true);
            this.afterModify(key,map[key].Index,value);
        }
        else
        {
            console.error("value not find by key:"+key)
        }
    },
    InsertValue:function(value,skip)
    {
        var map = this.Map;
        var ay = this.Ay;
        var idx = 0;
        if(ay.length == 0)
        {
            ay.push(value);
        }
        else
        {
            idx = Core.mapArrayHelper.arrayInsert(this.m_pSortKeys,ay,value,0,ay.length-1);
            for(var i=idx+1;i<ay.length;i++)
            {
                var ctemp = map[ay[i][this.m_pKey]];
                ctemp.Index++;
            }
        }
        var key = value[this.m_pKey];
        map[key] = {
            Index:idx,
            Value:value
        };

        if(!skip)
        {
            this.afterAdd(key,idx,value);
        }
    },
    RemoveValue:function(key,skip)
    {
        var map = this.Map;
        var ay = this.Ay;

        var temp = map[key];
        var idx = i = temp.Index;
        ay.splice(i,1);
        delete  map[key];
        for(; i<ay.length; i++ )
        {
            var ctemp = map[ay[i][this.m_pKey]];
            ctemp.Index--;
        }

        if(!skip)
        {
            this.afertDel(key,idx,temp);
        }
    },
    RemoveAll:function()
    {
        var map = this.Map;
        for(var key in map)
        {
            delete map[key];
        }
        var ay = this.Ay
        ay.splice(0,ay.length);
    },
    afterAdd:function(key,idx,value)
    {
        console.log("afterAdd");
    },
    afterModify:function(key,idx,value)
    {
        console.log("afterModify");
    },
    afertDel:function(key,idx,value)
    {
        console.log("afertDel");
    }
})