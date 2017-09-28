require("../../base/Core");
require("../../data/user/CDataCenter");
Class({
    ClassName:"Game.SceneState.hall",
    Base:"Game.SceneState.SceneStateBase",
    m_pTimer:null,
    Loader:null,
    m_pPreloadPrefabs:["hall/hall"],
    onEnter:function()
    {
        var self = this;
        this.CurrentPercent = 30;
        this.loadPrefabs();
        this._super();
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
            var hallUI = Game.UI.CUIController.hall.Create();
            hallUI.parent = cc.director.getScene();
            var size = cc.director.getWinSize();
            hallUI.setPosition(0,0);
            var controller = hallUI.Controller;
            self.Controllers[controller.PerfabName] = controller;
        });
        this._super();
    },
    prefabsLoaded:function()
    {
        cc.director.preloadScene(this.ScneneName, this.onSceneLoaded.bind(this));
    }
})
