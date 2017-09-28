/**
 * Created by Class on 2017/3/10.
 */
module.exports.afterStartup = function(app, cb) {
    cb();
    app.rpc.zjh.gameRemote.init(null,function()
    {

    });
};


//module.exports.beforeShutdown = function(app, cb) {
//    console.log("----------------------beforeShutdown");
//    cb();
//};