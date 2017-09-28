/**
 * Created by Administrator on 2017/3/8.
 */
require("../base/CBaseUserData");
require("../../../base/Core");
Class({
    ClassName:"Game.Data.CDataUser",
    Base:"Game.Data.CBaseUserData",
    factoryValue:{
        get:function(){

            return {};
        }
    },
    init:function()
    {
        Client.addmap("enterGameRes",this);
    },
    enterGameRes:function(msg,req)
    {
        var value = {
            name:msg.name,
            sex:msg.sex,
            headimg:msg.headimg,
            lv:msg.lv,
            exp:msg.exp,
            userid:msg.userid
        }
        this.NewValue = value;
    }

})