cc.Class({
    extends: cc.Component,

    properties: {
        
        PercentLabel:cc.Label,
        PercentBar:cc.ProgressBar,
        Target:null,
        CompleteCallBack:null,
        TotalPercent:100,
        CurrentPercent:0
    },

    // use this for initialization
    onLoad: function () {
        this.mCacheString = this.PercentLabel.string;
        this.m_CurentLoadPercent = 0;
        //this.StopLoad();
    },

    StartLoad:function()
    {
        this.node.active = true;
    },
    update:function()
    {
        if(this.mComplete)
            return;
        this.m_CurentLoadPercent =  Math.min(++this.m_CurentLoadPercent, this.CurrentPercent);
        var current  = Math.min(this.m_CurentLoadPercent, this.TotalPercent);
        this.PercentLabel.string = this.mCacheString.Format(current,this.TotalPercent);
        this.PercentBar.progress = current/this.TotalPercent;

        if(current == this.TotalPercent)
        {
            this.mComplete = true;
            setTimeout(this.complete,100,this);
        }
    },
    StopLoad:function()
    {
        this.CurrentPercent = 0;
        this.PercentBar.progress = 0;
        this.TotalPercent = 100;
        this.Target = null;
        this.CompleteCallBack = null;
        this.mComplete = false;

        this.node.active = false;
    },
    complete:function()
    {
        if(this.CompleteCallBack)
        {
            this.CompleteCallBack.call(this.Target,null);
        }
        this.StopLoad();
    }
});
