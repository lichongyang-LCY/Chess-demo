/**
 * Created by Administrator on 2017/3/5.
 */
Core.$Defines("Game.Data.GameLocalData")({
    init: function() {
        (function(T)
        {


            Object.defineProperty(T, "token", {
                get: function () {
                    var gid =  "token";
                    var ret = cc.sys.localStorage.getItem(gid);
                    if (ret === "" || ret === undefined || ret=="(null)")
                        ret = null;
                    return ret;
                },
                set: function (v) {
                    var gid =  "token";
                    cc.sys.localStorage.setItem(gid, v);
                }
            });
            Object.defineProperty(T, "account", {
                get: function () {
                    var gid =  "account";
                    var ret = cc.sys.localStorage.getItem(gid);
                    if (ret === "" || ret === undefined || ret=="(null)")
                        ret = null;
                    return ret;
                },
                set: function (v) {
                    var gid =  "account";
                    cc.sys.localStorage.setItem(gid, v);
                }
            });
            Object.defineProperty(T, "pwd", {
                get: function () {
                    var gid =  "pwd";
                    var ret = cc.sys.localStorage.getItem(gid);
                    if (ret === "" || ret === undefined || ret=="(null)")
                        ret = null;
                    return ret;
                },
                set: function (v) {
                    var gid =  "pwd";
                    cc.sys.localStorage.setItem(gid, v);
                }
            });

        }(Game.Data.GameLocalData))
    }
})
