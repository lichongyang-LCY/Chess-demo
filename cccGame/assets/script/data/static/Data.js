/**
 * Created by Administrator on 2016/11/29.
 */
Core.$Defines("Game.Data")({
    StaticInformation: {},
    init: function() {
        var staticNames = Game.Config.Data.StaticNames;
        for (var a in staticNames)
            Game.Data.StaticInformation[a] = Game.CStaticInformationClass.Create(staticNames[a]);
        //cc.log("static information loading done.");
        //for (a in Game.Data.DynamicNames);
        //cc.log("data init done.")
    }
});
