Class({
    ClassName:"Game.Net.CHttpRequest",
    DefaultTimeOut:10000,
    onTimeout:null,
    mTimer:null,
    /*
     * route : url
     * vMap : value
     * id protocol id
     * name protocol name
     * cb callback {t:target,cb:callback}
     * notify isNotify
     * */
    Send : function(route,vMap,id,payloadName,cb,notify) {

        var xhr = cc.loader.getXMLHttpRequest();
        var params = "?";
        var errorAy = cb?cb["e"]:null;
        var callfunc = cb?cb.cb:null;
        var target = cb?cb.t:null;
        for(var key in vMap)
        {
            //params.length? params+="&":params="?"
            if(void 0 != vMap[key])
                params="{0}{1}={2}&".Format(params,key,vMap[key]);
        }
        var self = this;
        //No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:63342' is therefore not allowed access.
        var url=encodeURI("http://{0}{1}".Format(route,params));
        xhr.open("POST", url, true);
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState == 4 )
            {
                if(self.mTimer)
                {
                    clearTimeout(self.mTimer);
                    self.mTimer = null;
                }
                if(xhr.status >= 200 && xhr.status <= 207)
                {
                    var obj = JSON.parse(xhr.responseText);
                    Server.onmessage(obj, id ,payloadName ,vMap, notify, cb);

                }
                else{
                    cc.Asset(false,"http back state error");
                    //Server.onmessage();
                }
            }
        }

        xhr.send();
        this.mTimer = setTimeout(function()
        {
            xhr.abort();
            this.onTimeout();
        },this.DefaultTimeOut,this);


    },
    CheckError:function()
    {

    },
    onTimeout:function()
    {
        Server.onfaildsend(0);
    }
}).Static({
    Instance:Core.Instance
})