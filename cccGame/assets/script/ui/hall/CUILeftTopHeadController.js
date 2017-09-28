/**
 * Created by Administrator on 2017/3/11.
 */
require("../uiBase/CUIBaseController");
Class({
    ClassName:"Game.UI.CUIController.CUILeftTopHeadController",
    Base:"Game.UI.CUIBaseController",
    PerfabName:"headInfo",

    m_pHeadSprite:null,
    m_pNameTTF:null,
    m_pIDTTF:null,
    m_pGemsTTF:null,

    onLoad:function()
    {
        this.m_pHeadSprite = this.node.getChildByName("UI_Image_Head").getComponent(cc.Sprite);;
        this.m_pNameTTF = this.node.getChildByName("UI_Lebel_Name").getComponent(cc.Label);
        this.m_pIDTTF = this.node.getChildByName("UI_Lebel_ID").getComponent(cc.Label);
        var ukRoot = this.node.getChildByName("UI_FK");
        this.m_pGemsTTF = ukRoot.getChildByName("UI_TTF_FK").getComponent(cc.Label);
        var btn = ukRoot.getChildByName("UI_Button_ADD");
        btn.on('click', this.Btn_Add_Click, this);

        var userData = Game.Data.CDataCenter.Instance.User.Value;

        this.m_pNameTTF.string = userData.name;
        this.m_pIDTTF.primevalString = this.m_pIDTTF.string;
        this.m_pIDTTF.string = this.m_pIDTTF.primevalString.Format(userData.userid) ;;

        //this.m_pHeadSprite.SpriteFrame =
    },
    onEnable:function()
    {
       var dataCenter = Game.Data.CDataCenter.Instance;
        dataCenter.Gems.AddObserver(this.updateGems,this);
        Game.UI.CUIBaseController.prototype.onEnable.call(this);
    },
    onDisable:function()
    {
        var dataCenter = Game.Data.CDataCenter.Instance;
        dataCenter.Gems.RemoveObserver(this.updateGems,this);
        Game.UI.CUIBaseController.prototype.onDisable.call(this);
    },
    //updateUser:function(v)
    //{
    //
    //},
    updateGems:function(n,o)
    {
        this.m_pGemsTTF.string = n ;
    },
    Btn_Add_Click:function()
    {
        console.log("Btn_Add_Click");
    }
})