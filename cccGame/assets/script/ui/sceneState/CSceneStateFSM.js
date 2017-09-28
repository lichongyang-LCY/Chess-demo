
require("../../base/Core");

Core.$Defines("Game.Const.SceneState")({
    StateID:
    {
        "Login":"login",
        "Hall":"hall",
        "ZJH":"zjh"
    }
});
Class({
    ClassName:"Game.SceneState.CSceneStateFSM",
    m_oCruuentSceneState:null,
    m_oNextSceneState:-1,
    m_oPreSceneState:-1,
    m_oGlobleSceneState:-1,
    Loader:null,
    CurrentSceneState:{
        get:function()
        {
            return this.m_oCruuentSceneState;
        }
    },
    createSceneState:function(id)
    {
        return Game.SceneState[id].Create();
    },
    TransformToState:function(id,info)
    {
        this.m_oNextSceneState = this.createSceneState(id);
        this.m_oNextSceneState.Loader = this.Loader;
        if(!!this.m_oCruuentSceneState)
        {
            this.m_oCruuentSceneState.onExit();
        }
        this.m_oPreSceneState = this.m_oCruuentSceneState;
        this.m_oCruuentSceneState =  this.m_oNextSceneState;
        this.m_oCruuentSceneState.onEnter(info);
        this.m_oNextSceneState = null;
    }
}).Static({
    Instance:Core.Instance
})
