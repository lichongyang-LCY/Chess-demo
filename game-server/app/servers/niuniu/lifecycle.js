/**
 * Created by root on 3/21/17.
 */
module.exports.afterStartup = function(app, cb) {
    cb();
    app.rpc.niuniu.gameRemote.init(null,function()
    {

    });
};