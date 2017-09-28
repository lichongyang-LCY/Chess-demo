
require("../uiBase/CUIBaseController");

Class({
    ClassName:"Game.UI.CUIController.hall",
    Base:"Game.UI.CUIBaseController",
    PerfabName:"hall/hall",


    m_Input:null,
    m_Controllers:null,
    onLoad:function()
    {
        this.m_Controllers = {};

        var temp =this.node.getChildByName("UI_Create_Room");
        var btn = temp.getChildByName("UI_Create_Btn");
        btn.on('click', this.Btn_Create_Click, this);

        temp =this.node.getChildByName("UI_Join_Room");
        btn = temp.getChildByName("UI_Join_Btn");
        btn.on('click', this.Btn_Join_Click, this);



        var controllerCache = this.m_Controllers;
        var ui = Game.UI.CUIController.CUILeftTopHeadController.CreateByExistRoot(cc.find("UI_Node_Head",this.node));
        var controller = ui.Controller;
        controllerCache[controller.PerfabName] = controller;

        ui = Game.UI.CUIController.CUIRoomSearchController.CreateByExistRoot(cc.find("UI_Room_Search",this.node));
        controller = ui.Controller;
        controllerCache[controller.PerfabName] = controller;
        ui.active = false;

    },
    start:function()
    {

        console.log("login start");
    },
    onEnable:function()
    {
        Client.addmap("zjhJoinRes",this);
        Game.UI.CUIBaseController.prototype.onEnable.call(this);
    },
    onDisable:function()
    {

        Client.removemap("zjhJoinRes",this);
        Game.UI.CUIBaseController.prototype.onDisable.call(this);
    },
    Btn_Create_Click:function()
    {
        Server.game_join(-1,Game.Config.Games.zjh);
    },
    Btn_Join_Click:function()
    {
        this.m_Controllers["room_search"].node.active = true;
    },
    zjhJoinRes:function(msg)
    {

        Game.SceneState.CSceneStateFSM.Instance.TransformToState(Game.Const.SceneState.StateID.ZJH);
    }
})