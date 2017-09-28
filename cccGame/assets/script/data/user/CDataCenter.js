/**
 * Created by Administrator on 2017/3/8.
 */
require("../../base/Core");
require("./data/CDataCoins");
require("./data/CDataGems");
require("./data/CDataUser");
require("./zjh/CDataZJHRoom");
Class({
    ClassName:"Game.Data.CDataCenter",
    Datas:{},
    Coins:{get:function(){return this.Datas["CDataCoins"];}},
    Gems:{get:function(){return this.Datas["CDataGems"];}},
    User:{get:function(){return this.Datas["CDataUser"];}},
    ZJHRoom:{get:function(){return this.Datas["CDataZJH"];}},
    ctor:function()
    {
        this.init();
    },
    init:function()
    {
        this.Datas["CDataCoins"] =new Game.Data.CDataCoins;
        this.Datas["CDataGems"] =new Game.Data.CDataGems;
        this.Datas["CDataUser"] =new Game.Data.CDataUser;
        this.Datas["CDataZJH"] =new Game.Data.CDataZJHRoom;
    },
    Clear:function()
    {
        var datas = this.Datas;
        for(var key in datas )
        {
            datas[key].Clear();
        }
    },
}).Static({
    Instance:Core.Instance
})