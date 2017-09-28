cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        Controller:null
    },

    // use this for initialization
    onLoad: function () {
        this.Controller = this.node.Controller;
        if(!this.Controller.AccpectUI)
        {
            this.node.x =0;
            this.node.y = 0;
        }

        if(this.Controller.onLoad)
        {
            this.Controller.onLoad();
        }
    },

    start:function()
    {
        if(this.Controller.start)
        {
            this.Controller.start();
        }
    },

    onDestroy:function()
    {
        if(this.Controller.onDestroy)
        {
            this.Controller.onDestroy();
        }
        this.Controller.onClearup();
    },
    onEnable:function()
    {
        if(this.Controller.onEnable)
        {
            this.Controller.onEnable();
        }
    },
    onDisable:function()
    {
        if(this.Controller.onDisable)
        {
            this.Controller.onDisable();
        }
    }
});
