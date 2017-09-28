/**
 * Created by Administrator on 2017/8/5.
 */
require("../uiBase/CUIBaseController");
Class({
    ClassName:"Game.UI.CUIController.CUIRoomSearchController",
    Base:"Game.UI.CUIBaseController",
    PerfabName:"room_search",
    AccpectUI:true,
    onLoad:function()
    {
        this.m_SearchPannel = this.node.getChildByName("UI_Room_Search");
        var temp = cc.find("UI_Bg",this.node);
        this.m_Input =cc.find("UI_Input",temp).getComponent("cc.EditBox");
        var btn = cc.find("UI_Btn_Search",temp)
        btn.on('click', this.Btn_Search_Click, this);

        btn = cc.find("UI_Btn_Close",temp)
        btn.on('click', this.Btn_Close_Search_Click, this);
        this.node.active = false;
    },
    //onEnable:function()
    //{
    //    Game.UI.CUIBaseController.prototype.onEnable.call(this);
    //},
    //onDisable:function()
    //{
    //    Game.UI.CUIBaseController.prototype.onDisable.call(this);
    //},

    Btn_Search_Click:function()
    {
        var num = parseInt(this.m_Input.string);
        this.m_Input.string="";
        if(num)
            Server.game_join(num,Game.Config.Games.zjh);
    },
    Btn_Close_Search_Click:function()
    {
        this.node.active = false;
    }
})