/**
 * Created by root on 3/6/17.
 */
require("../../core/Core");
var accountDao = require("../../dao/accountDao");
Class({
    ClassName:"Game.Data.CAccountData"

}).Static({

    NextAccount:{
        key:"_nextId",
        get:function()
        {
            var timestamp =  Date.parse(new Date())/1000 ;
            return timestamp+""+ (this._nextId = (this._nextId+1)%10000);
        }
    },
    CreateByData:function(acc,pwd,cb)
    {
        accountDao.CreateData(acc,pwd,function(err,data)
        {
            if(err)
            {
                cb(err,null)
            }
            else
            {
                cb(null,{"account":acc,"password":pwd})
            }
        })
    },
    CreateByMysql:function(acc,cb)
    {
        accountDao.getDataByAcc(acc,function(err,data)
        {
            if(err || data.length == 0)
            {
                cb({"e":"no user"},null)
            }
            else
            {
                cb(null,data[0])
            }
        })
    }
})