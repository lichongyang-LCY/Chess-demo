require("../../base/Core");
require("../uiBase/CUIBaseController");
require("./CUIZJHOnePersonOverController");

Class({
    ClassName:"Game.UI.CUIController.CUIZJHOnePersonOverController",
    Base:"Game.UI.CUIBaseController",
    PerfabName:"zjh/UI_OnePerson_Over",
    m_pTTFName:null,
    m_pValue:null,
    m_pWinTip:null,
    AccpectUI:true,
    onLoad:function()
    {
        this.m_pTTFName = this.node.getChildByName("UI_TTF_Name").getComponent(cc.Label);
        this.m_pValue = this.node.getChildByName("UI_TTF_Point").getComponent(cc.Label);
        this.m_pWinTip = this.node.getChildByName("UI_Winner_Tip");

    },
    Show:function(uid,winner,value)
    {
        this.m_pValue.string = value.point;
        var persons = Game.Data.CDataCenter.Instance.ZJHRoom.Value;
        for(var key in persons)
        {
            var pInfo = persons[key].Value;
            if(pInfo.userid == uid)
            {
                this.m_pTTFName.string = pInfo.name;
                break;
            }
        }

        this.m_pWinTip.active = uid == winner;
        this.node.active = true;
    }

})
