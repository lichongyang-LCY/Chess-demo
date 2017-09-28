/**
 * Created by Administrator on 2016/11/24.
 */
Class({
    ClassName:"Core.msgClass",
    ctor:function()
    {
        /*
         *   { key : []}
         * */
        var msglist = {};
        function addmap(key,t,f)
        {

            var list = msglist[key] ;
            if(list)
            {
                list.push([t,f]);
            }
            else
            {
                msglist[key] = [[t,f]];
            }

        }
        function removemap(key ,t,f)
        {
            var list = msglist[key] ;
            if(list)
            {
                for(var i=0;i<list.length;i++)
                {
                    var temp = list[i];
                    if(temp[0] == t && temp[1] == f)
                    {
                        list.splice(i,1);
                        break;
                    }
                }
            }
            else
            {
                console.error("not find in maplist by key:"+key);
            }
        }

        function notify(key,msg,req,cres)
        {
            var list = msglist[key];
            if(list)
            {
                console.log(key)
                for(var i=0;i<list.length;i++)
                {
                    var temp = list[i];
                    temp[1].call(temp[0],msg,req,cres) ;
                }
            }

        }

        function clear()
        {
            msglist = {};
        }
        this.addmap = addmap;
        this.removemap = removemap;
        this.notify = notify;
        this.clear = clear;

    }

})
Core.MSG = {
    msgs:{

    }
    //get Mgr ()
    //{
    //    if(!this._mgrInstance)
    //    {
    //        this._mgrInstance = new Core.MSGClass()
    //    }
    //    return this._mgrInstance;
    //}
}