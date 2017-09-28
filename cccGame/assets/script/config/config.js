/**
 * Created by Administrator on 2016/11/29.
 */

require("../base/Core");
require("../data/GameLocalData");
Core.$Defines("Game.Config")({
    init:function()
    {
        Game.Data.init();
        var url = "{0}/protocol.json".Format(this.Path.DataPath) ;//cc.url.raw();
        var protocol = cc.loader.getRes(url);
        Server.init(protocol["Client"]);
        Client.init(protocol["Server"]);
        Game.Data.GameLocalData.init();
    },
    Path:{
        DataPath:"data"
    },
    ScreenSize:{
        width:1280,
        height:720
    },
    Data: {
        "StaticNames":
        {

        }
    },
    Games:{
        "zjh":1
    }
});