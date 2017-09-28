/**
 * Created by Class on 2017/3/14.
 */
require("../base/CBaseCard");

// 2-14   14=A
Class({
    ClassName: "Game.Data.CZJHCard",
    Base: "Game.Data.CBaseCard",
    ShowValue:{
        get:function()
        {
           return  Math.max(1,this.Face%14) ;
        }
    }
})