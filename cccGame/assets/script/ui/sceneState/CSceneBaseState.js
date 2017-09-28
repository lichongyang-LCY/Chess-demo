
require("../../base/Core");
Class({
    ClassName:"Game.SceneState.SceneStateBase",
    m_pTimer:null,
    Loader:null,
    m_pCacheInfo:null,
    m_pPreloadPrefabs:null,
    m_pCurrentPrefab:0,
    Prefabs:null,
    Controllers:{},
    ScneneName:{
        get:function()
        {
           return this.constructor.ClassName.split(".")[2];
        }
    },
    CurrentPercent:{
        set:function(v)
        {
          this.Loader.CurrentPercent = v;
        }
    },
    TotalPercent:{
        set:function(v)
        {
            this.Loader.TotalPercent = v;
        }
    },
    ctor:function()
    {
        cc.director.runScene(new cc.Scene());
    },
    onEnter:function(cacheInfo)
    {
        // if(!this.m_pTimer)
        // {
        //     this.m_pTimer = setInterval(this.update,0.1,this);
        // }
        cc.director.runScene(new cc.Scene());
        this.m_pCacheInfo = cacheInfo;
        this.Loader.CompleteCallBack = this.onComplete;
        this.Loader.Target = this;
        this.Loader.TotalPercent = 100;
        this.Loader.StartLoad();
    },
    onExit:function()
    {
        if(this.m_pPreloadPrefabs)
        {
            for(var i=0;i<this.m_pPreloadPrefabs.length;i++)
            {
                var res = "prefabs/{0}".Format(this.m_pPreloadPrefabs[i]);
                cc.loader.releaseAsset(res);
            }
        }
        this.Prefabs = {};
       console.log("must overWrite onExit");
    },
    onComplete:function()
    {
       console.log("must overWrite onComplete");
    },
    delayloadPrefabs:function()
    {
        this.m_pCurrentPrefab = -1;
        this.Prefabs = {};
        if(this.m_pPreloadPrefabs == null)
        {
            this.prefabsLoaded();
        }
        else
        {
            this.prefabOneLoaded();
        }
    },
    loadPrefabs:function()
    {
        setTimeout(this.delayloadPrefabs,10,this);
    },
    prefabOneLoaded:function(err,perfab)
    {
        if(this.m_pCurrentPrefab>-1 && !err)
        {
            this.Prefabs[this.m_pPreloadPrefabs[this.m_pCurrentPrefab]] = perfab;
        }
        this.m_pCurrentPrefab++;
        if(this.m_pCurrentPrefab == this.m_pPreloadPrefabs.length)
        {
            this.prefabsLoaded();
            return;
        }
        cc.loader.loadRes("prefabs/{0}".Format(this.m_pPreloadPrefabs[this.m_pCurrentPrefab]), this.prefabOneLoaded.bind(this));
    },
    prefabsLoaded:function()
    {
        console.log("prefabsLoaded loaded over");
    }
}).Static({
    Create:function()
    {
        return new this;
    }
})