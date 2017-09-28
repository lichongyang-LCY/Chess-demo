
require("../../base/Core");
var baseCompent = require("./CUIBaseComponent");
Class({
    ClassName:"Game.UI.CUIBaseController",
    node:null,
    AccpectUI:false,
    TouchBlock:{
        value:true,
        get:function()
        {
            return this.__TouchBlock;
        },
        set:function(v)
        {
            if(v != this.__TouchBlock)
            {
                if(v)
                {
                    this.node.on(cc.Node.EventType.TOUCH_START,this.TouchBegin_Block,this)
                }
                else
                {
                    this.node.off(cc.Node.EventType.TOUCH_START,this.TouchBegin_Block,this)
                }
                this.__TouchBlock = v;
            }
        }
    },

    reset:function()
    {

    },
    setDirty:function()
    {
        setTimeout(this.refreshUI,0,this);
    },
    refreshUI:function()
    {
        console.warn("must overwrite this refreshUI");
    },
    onEnable:function()
    {
        if(this.__TouchBlock)
            this.node.on(cc.Node.EventType.TOUCH_START,this.TouchBegin_Block,this)

    },
    onDisable:function()
    {
        if(this.__TouchBlock)
            this.node.off(cc.Node.EventType.TOUCH_START,this.TouchBegin_Block,this)
    },
    TouchBegin_Block:function(event)
    {
        event.stopPropagation();
    },
    Cache:function()
    {
        this.node.active = false;
        this.node.parent = Game.SceneState.CSceneStateFSM.Instance.GameController.node;
    },
    ToScene:function(parent)
    {
        parent = parent || cc.director.getScene();
        this.node.parent = parent ;
        this.node.active = false;
    },
    destruct:function()
    {
        this.node.parent = null;
        this.node.destroy();


    },
    onClearup:function()
    {

    }
}).Static({
    Create:function(){
        var cInstance = new this();
        var perfab = Game.SceneState.CSceneStateFSM.Instance.CurrentSceneState.Prefabs[cInstance.PerfabName];
        var pInstance = cc.instantiate(perfab);
        cInstance.node = pInstance;
        pInstance.Controller = cInstance;
        pInstance.addComponent(baseCompent);
        if(cInstance.init)
            cInstance.init.apply(cInstance,arguments);
        return pInstance;

    },
    CreateByPerfabName:function(perfabName){
        var cInstance = new this();
        var perfab = Game.SceneState.CSceneStateFSM.Instance.CurrentSceneState.Prefabs[perfabName];
        var pInstance = cc.instantiate(perfab);
        cInstance.node = pInstance;
        pInstance.Controller = cInstance;
        pInstance.addComponent(baseCompent);
        if(cInstance.init)
            cInstance.init.apply(cInstance,arguments);
        return pInstance;

    },
    CreateByExistRoot:function(root,cInstance)
    {
        var cInstance = cInstance?cInstance:new this();
        var pInstance = root;
        cInstance.node = pInstance;
        pInstance.Controller = cInstance;
        pInstance.addComponent(baseCompent);
        if(cInstance.init)
            cInstance.init.apply(cInstance,arguments);
        return pInstance;
    }
    //initCompent:function()
    //{
    //    var props =[
    //        "onLoad",
    //        "start",
    //        "update",
    //        "lateUpdate",
    //        "onDestroy",
    //        "onEnable",
    //        "onDisable"
    //    ]
    //    for(var i=0;i<props.length;i++)
    //    {
    //        var key = props[i];
    //        cc.Component.prototype[key] = Game.UI.CUIBaseController.prototype[key]
    //    }
    //}
})

