require("../../base/Core");
require("../uiBase/CUIBaseController");

Class({
    ClassName:"Game.UI.CUIController.login",
    Base:"Game.UI.CUIBaseController",
    PerfabName:"login/login",

    onLoad:function()
    {
        var btn = this.node.getChildByName("UI_Button_Visitor");
        btn.on('click', this.Btn_Visitor_Click, this);

        btn = this.node.getChildByName("UI_Button_WeChat");
        btn.on('click', this.Btn_Wechat_Click, this);
    },
    start:function()
    {

        console.log("login start");
    },
    onEnable:function()
    {
        Client.addmap("getTokenRes",this);
        Client.addmap("newUserRes",this);
        Client.addmap("enterGameRes",this);
        Game.UI.CUIBaseController.prototype.onEnable.call(this);
    },
    onDisable:function()
    {
        Client.removemap("getTokenRes",this);
        Client.removemap("newUserRes",this);
        Client.removemap("enterGameRes",this);

        Game.UI.CUIBaseController.prototype.onDisable.call(this);
    },
    Btn_Visitor_Click:function()
    {
        var account = Game.Data.GameLocalData.account;
        account?account="{0}|{1}".Format(Game.Data.GameLocalData.account,Game.Data.GameLocalData.pwd):null;
        Server.getToken(account ,0);
    },
    Btn_Wechat_Click:function()
    {
        Server.getToken(Game.Data.GameLocalData.token,1);
    },
    getTokenRes:function(msg,req)
    {
        var token = msg.token;
        var rtoken = msg.rtoken;
        if(token)
        {
            this.loginByToken(msg);
        }
        else
        {
            Game.Data.GameLocalData.account = msg.acc;
            Game.Data.GameLocalData.pwd = msg.acc;
            Server.newUser(rtoken,"asd",1);
        }
    },
    newUserRes:function(msg,req)
    {
        var token = msg.token;
        this.loginByToken(msg);
    },
    loginByToken:function(msg)
    {
        var token = msg.token;
        Game.Data.GameLocalData.token = token;
        Server.beginConnect(msg.host,msg.port,function()
        {
            Server.enterGame(token);
        });
    },
    enterGameRes:function(msg)
    {
        Game.SceneState.CSceneStateFSM.Instance.TransformToState(Game.Const.SceneState.StateID.Hall);
    }
})
