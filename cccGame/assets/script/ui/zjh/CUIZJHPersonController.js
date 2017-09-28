require("../../base/Core");
require("../uiBase/CUIBaseController");
require("../card/CUICardController");
Class({
    ClassName:"Game.UI.CUIController.CUIZJHPersonController",
    Base:"Game.UI.CUIBaseController",

    m_pHeadSprite:null,
    m_pNameTTF:null,

    m_pCards:null,
    Seat:0,
    m_NodeCards:null,
    m_pNodeSawCard:null,
    m_pNodePassCard:null,

    AccpectUI:true,
    DataSource:{
        get:function()
        {
            return Game.Data.CDataCenter.Instance.ZJHRoom.Value[this.Seat];
        }
    },
    onLoad:function()
    {
        this.m_pHeadSprite = this.node.getChildByName("UI_Sprite_Head").getComponent(cc.Sprite);
        this.m_pNameTTF = this.node.getChildByName("UI_TTF_Name").getComponent(cc.Label);
        this.m_pNodeSawCard = this.node.getChildByName("UI_TTF_SawCard");
        this.m_pNodePassCard = this.node.getChildByName("UI_TTF_Pass");
        this.m_pNodePassCard.active = false;
        this.m_pNodeSawCard.active = false;
        var temp = this.m_NodeCards  = this.node.getChildByName("Cards");
        this.m_pCards = {};
        for(var i=1;i<4;i++)
        {
            var node = temp.getChildByName("Card{0}".Format(i));
            var cardUI = Game.UI.CUIController.CUICardController.Create();
            cardUI.parent = node;
            cardUI.setPosition(0,0);
            this.m_pCards[i] = cardUI.Controller;
        }
    },

    onEnable:function()
    {
        if(this.Seat != 0)
            this.DataSource.AddObserver(this.UpdateUI,this);
        Game.UI.CUIBaseController.prototype.onEnable.call(this);
    },
    onDisable:function()
    {
        if(this.Seat != 0 && this.DataSource)
            this.DataSource.RemoveObserver(this.UpdateUI,this);
        Game.UI.CUIBaseController.prototype.onDisable.call(this);
    },
    UpdateUI:function(n,o)
    {
        if(void 0 != o )
        {
            if(o instanceof Array)
            {
                var type=o[0],value=o[1];
                this.m_NodeCards.active = true;
                if(type == Game.Const.CZJHPerson.ChangeType.Saw)
                {
                    for(var i=1;i<4;i++)
                    {
                        this.m_pCards[i].CardData = value[i-1]
                    }
                }
            }
            else if(o == Game.Const.CZJHPerson.ChangeType.Saw)
            {
                this.m_pNodeSawCard.active = true;
            }
            else if(o == Game.Const.CZJHPerson.ChangeType.Saw)
            {
                this.m_pNodeSawCard.active = false;
                this.m_pNodeSawCard.active = true;
            }

        }
        else
        {
            this.m_pNameTTF.string = n.name;
            this.m_NodeCards.active = false;
            //var data = Game.Data.CDataCenter.Instance.ZJHRoom.Value[this.Seat];
        }

    }
})