require("../../base/Core");
require("../../data/user/CDataCenter");
Class({
    ClassName:"Game.SceneState.login",
    Base:"Game.SceneState.SceneStateBase",
    m_pTimer:null,
    Loader:null,
    m_pPreloadPrefabs:["login/login"],
    onEnter:function()
    {
        this._super();
        var self = this;
        
        cc.loader.loadResDir(Game.Config.Path.DataPath, function (err, jsons) {
            self.GameDataInit();
        });
    },
    GameDataInit:function()
    {
        Game.Config.init();
        Game.Data.CDataCenter.Instance.Clear();
        this.CurrentPercent = 30;
        this.loadPrefabs();

    },
    onSceneLoaded:function()
    {
        this.CurrentPercent = 100;

    },
    prefabOneLoaded:function(err,prefab)
    {
        if(this.m_pCurrentPrefab>-1)
        {
            this.CurrentPercent = 30 + 60*(this.m_pCurrentPrefab/this.m_pPreloadPrefabs.length);
        }
        this._super(err,prefab);
    },

    onComplete:function()
    {
        var self = this;
       cc.director.loadScene(this.ScneneName,function(){
           var loginUI = Game.UI.CUIController.login.Create();
           loginUI.parent = cc.director.getScene();
           var size = cc.director.getWinSize();
           loginUI.setPosition(size.width/2,size.height/2);
           var controller = loginUI.Controller;
           self.Controllers[controller.PerfabName] = controller;
       });
        this._super();
    },
    prefabsLoaded:function()
    {
        cc.director.preloadScene(this.ScneneName, this.onSceneLoaded.bind(this));
    }
})
