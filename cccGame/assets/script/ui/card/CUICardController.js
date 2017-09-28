/**
 * Created by Class on 2017/3/14.
 */
require("../../base/Core");
require("../uiBase/CUIBaseController");

Class({
    ClassName:"Game.UI.CUIController.CUICardController",
    Base:"Game.UI.CUIBaseController",
    PerfabName:"common/card",
    m_pFrontNode:null,
    m_pBackNode:null,
    m_pValueTTF:null,
    m_pColorNodes:null,
    CardData:{
        value:null,
        get:function()
        {
            return this.__CardData;
        },
        set:function(v)
        {
            this.__CardData = new Game.Data.CZJHCard(v);
            this.setDirty();
        }
    },


    refreshUI:function()
    {

        if(this.__CardData)
        {
            this.m_pBackNode.active = false;
            this.m_pFrontNode.active = true;

            var color = this.__CardData.Color;
            var value = this.__CardData.ShowValue;

            this.m_pValueTTF.string = this.__CardData.ShowValue;
            var color = this.__CardData.Color;
            for(var i=0;i<4;i++)
            {
                this.m_pColorNodes[i].active = i ==color;
            }
        }
        else
        {
            this.m_pBackNode.active = true;
            this.m_pFrontNode.active = false;
        }
    },
    onLoad:function()
    {
        this.m_pFrontNode = this.node.getChildByName("UI_Sprite_Front");
        this.m_pBackNode = this.node.getChildByName("UI_Sprite_Back");
        this.m_pValueTTF = this.m_pFrontNode.getChildByName("UI_TTF_Value").getComponent(cc.Label);

        var colorNodes = this.m_pFrontNode.getChildByName("UI_Color");
        this.m_pColorNodes = {};
        for(var i=0;i<4;i++)
        {
            this.m_pColorNodes[i] =colorNodes.getChildByName("UI_TTF_Color_{0}".Format(i));
        }
    }

})