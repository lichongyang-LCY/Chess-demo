require("../../base/Core");
require("../zjh/CUIZJHController");
Class({
    ClassName:"Game.SceneState.zjh",
    Base:"Game.SceneState.SceneStateBase",
    m_pTimer:null,
    Loader:null,
    m_pPreloadPrefabs:["zjh/zjh","common/card","zjh/UI_OnePerson_Over"],
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
            var ui = Game.UI.CUIController.zjh.Create();
            ui.parent = cc.director.getScene();
            var controller = ui.Controller;
            self.Controllers[controller.PerfabName] = controller;
            ui.active = true;
        });
        this._super();
    },
    prefabsLoaded:function()
    {
        cc.director.preloadScene(this.ScneneName, this.onSceneLoaded.bind(this));
    }
})
