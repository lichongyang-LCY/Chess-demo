require("../../base/Core");
require("../uiBase/CUIBaseController");
require("./CUIZJHPersonController");
require("./CUIZJHGameOverController");

Core.$Defines("Game.Const.CUIController.zjh")({
    BtnState:
    {
        "Start":0x1<<0,
        "Ready":0x1<<1,
        "SeeCard":0x1<<2,
        "Fllow":0x1<<3,
        "GiveUp":0x1<<4,
        "Open":0x1<<5
    }
});
Class({
    ClassName:"Game.UI.CUIController.zjh",
    Base:"Game.UI.CUIBaseController",
    PerfabName:"zjh/zjh",

    AccpectUI:true,
    m_pTTFRoomID:null,
    m_pUIPersons:null,
    m_pUIBtns:null,
    m_pUIEditBoxPoint:null,
    m_pUIHallPoint:null,
    m_pGameOverCtr:null,
    BtnState:{
        get:function()
        {
            return this.__BtnState;
        },
        set:function(v)
        {
            this.__BtnState = v;
            for(var i=0;i<6;i++)
            {
                var value = 0x1<<i;
                this.m_pUIBtns[value].active = v&value;
            }
        }
    },

    onLoad:function()
    {
        this.m_pTTFRoomID = this.node.getChildByName("UI_TTF_RoomID").getComponent(cc.Label);
        this.m_pTTFRoomID.primevalString = this.m_pTTFRoomID.string;
        this.m_pUIEditBoxPoint = this.node.getChildByName("UI_EditBox_Point").getComponent(cc.EditBox);
        this.m_pUIHallPoint = this.node.getChildByName("UI_TTF_HallPoints").getComponent(cc.Label);

        this.m_pGameOverCtr = Game.UI.CUIController.CUIZJHGameOverController.CreateByExistRoot(this.node.getChildByName("UI_Over_Layer")).Controller;


        this.m_pUIHallPoint.node.active = false;
        this.m_pUIPersons = {};
        this.m_pUIBtns = {};

        var btns = this.node.getChildByName("Buttons");
        var btnNames = [
            ["UI_Btn_Start",this.Btn_Start_Click],
            ["UI_Btn_Ready",this.Btn_Ready_Click],
            ["UI_Btn_See",this.Btn_See_Click],
            ["UI_Btn_Follow",this.Btn_Follow_Click],
            ["UI_Btn_Pass",this.Btn_Pass_Click],
            ["UI_Btn_Open",this.Btn_Open_Click]];
        for(var i=0;i<btnNames.length;i++)
        {
            var btnTip = btnNames[i];
            var btn = btns.getChildByName(btnTip[0]);
            btn.on('click', btnTip[1], this);
            this.m_pUIBtns[0x1<<i] = btn;
        }

        var temp = this.node.getChildByName("zjh_person");
        for(var i=1;i<4;i++)
        {
            var pui = temp.getChildByName("zjh_person{0}".Format(i));

            var ctr = Game.UI.CUIController.CUIZJHPersonController.CreateByExistRoot(pui).Controller;
            this.m_pUIPersons[i] = ctr;
            pui.active = false;
            ctr.Seat = i;
        }
    },
    ResetUI:function()
    {
        var dataCenter = Game.Data.CDataCenter.Instance,roomid = dataCenter.ZJHRoom.RoomID,userid = dataCenter.User.Value.userid,roomer=dataCenter.ZJHRoom.Roomer;
        this.m_pTTFRoomID.string = this.m_pTTFRoomID.primevalString.Format(roomid);
        var n = dataCenter.ZJHRoom.Value;
        for(var i in n)
        {

            console.log("node true:"+i);
            this.m_pUIPersons[i].node.active = true;
        }
        console.log("ready");
        this.BtnState = userid ==roomer ?Game.Const.CUIController.zjh.BtnState.Start :  Game.Const.CUIController.zjh.BtnState.Ready;
        this.m_pGameOverCtr.node.active = false;
    },
    onEnable:function()
    {
        Client.addmap("onZJHSeeCards",this);
        Client.addmap("onZJHOneOver",this);

        this.ResetUI();
        Game.Data.CDataCenter.Instance.ZJHRoom.AddObserver(this.UpdateUI,this);
        Game.UI.CUIBaseController.prototype.onEnable.call(this);
    },
    onDisable:function()
    {
        Client.removemap("onZJHSeeCards",this);
        Client.removemap("onZJHOneOver",this);
        Game.Data.CDataCenter.Instance.ZJHRoom.RemoveObserver(this.UpdateUI,this);

        Game.UI.CUIBaseController.prototype.onDisable.call(this);
    },
    UpdateUI:function(n,o)
    {
        this.m_pUIEditBoxPoint.node.active=false;
        var dataCenter = Game.Data.CDataCenter.Instance,roomid = dataCenter.ZJHRoom.RoomID,userid = dataCenter.User.Value.userid,roomer=dataCenter.ZJHRoom.Roomer;
        if(o)
        {
            var seat = o[0],type=o[1];
            var types = Game.Const.CDataZJHRoom.ChangeType;

            switch (type)
            {
                case types.AddP:
                {
                    this.m_pUIPersons[seat].node.active = true;
                    break;
                }
                case types.DelP:
                {
                    this.m_pUIPersons[seat].node.active = false;
                    break;
                }
                case types.Ready:
                {
                    this.BtnState = userid ==roomer ?Game.Const.CUIController.zjh.BtnState.Start :  0;
                    break;
                }
                case types.Activity:
                {
                    this.m_pUIHallPoint.node.active = true;
                    this.m_pUIHallPoint.string = dataCenter.ZJHRoom.HallPoint;

                    var btnStates = Game.Const.CUIController.zjh.BtnState;
                    var selfPerson = dataCenter.ZJHRoom.Value[dataCenter.ZJHRoom.SelfSeat];
                    var seeCard = selfPerson.Saw?0x0: btnStates.SeeCard;
                    var actUserid = seat;



                    if(actUserid == userid)
                    {
                        this.m_pUIEditBoxPoint.node.active=true;
                        this.m_pUIEditBoxPoint.string = selfPerson.BasePoint;

                        if(dataCenter.ZJHRoom.PersonsInGame == 2)
                            this.BtnState = seeCard | btnStates.Fllow | btnStates.GiveUp | btnStates.Open;
                        else
                            this.BtnState = seeCard | btnStates.Fllow | btnStates.GiveUp;
                    }
                    else
                    {
                        this.BtnState = seeCard;
                    }

                    break;
                }

            }
        }

    },
    Btn_Start_Click:function()
    {
        if(Game.Data.CDataCenter.Instance.ZJHRoom.Ready)
        {
            Server.game_start(Game.Config.Games.zjh);
        }
        else
        {
            alert("can't start game,may some one not ready");
        }
    },
    Btn_Ready_Click:function()
    {
        Server.game_ready(1,Game.Config.Games.zjh);
    },
    Btn_See_Click:function()
    {
        Server.game_see(Game.Config.Games.zjh);
    },
    Btn_Follow_Click:function()
    {
        var dataCenter = Game.Data.CDataCenter.Instance;
        var myPserson = dataCenter.ZJHRoom.SelfPerson;
        var point = parseInt(this.m_pUIEditBoxPoint.string);
        if(!myPserson.CheckPointRight(point))
        {
            alert("point error");
            this.m_pUIEditBoxPoint.string = myPserson.BasePoint;
            return;
        }
        Server.game_follow(point,Game.Config.Games.zjh);
    },
    onZJHSeeCards:function()
    {
        var label = this.m_pUIEditBoxPoint;
        setTimeout(function()
        {
            label.string = Game.Data.CDataCenter.Instance.ZJHRoom.SelfPerson.BasePoint;
        },10)

    },
    Btn_Pass_Click:function()
    {
        Server.game_giveup(Game.Config.Games.zjh);
    },
    Btn_Open_Click:function()
    {
        Server.game_open(Game.Config.Games.zjh);
    },
    onZJHOneOver:function(msg)
    {
        this.m_pGameOverCtr.Show(msg.p,msg.winner);
        setTimeout(this.ResetUI,5000,this);
    }
})
