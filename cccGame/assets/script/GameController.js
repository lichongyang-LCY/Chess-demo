const CLoadingController = require('./ui/CLoadingController');
require('./ui/sceneState/CSceneStateFSM');
cc.Class({
    extends: cc.Component,

    properties: {
        Loader:CLoadingController,
        DefaultScene:Game.Const.SceneState.StateID.Login,
    },

    // use this for initialization
    onLoad: function () {
        cc.game.addPersistRootNode(this.node);
        cc.view.adjustViewPort(true);
        cc.view.setDesignResolutionSize(Game.Config.ScreenSize.width, Game.Config.ScreenSize.height,cc.ResolutionPolicy.SHOW_ALL);
        cc.view.resizeWithBrowserSize(true);
        var sceneFSM = Game.SceneState.CSceneStateFSM.Instance;
        sceneFSM.Loader = this.Loader;
        sceneFSM.TransformToState(this.DefaultScene);//Game.Const.SceneState.Login



    }


    // called every frame, uncomment this function to activate update callback
});
