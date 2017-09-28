var exp = module.exports;
var dispatcher = require('./dispatcher');

exp.onstage = function(session, msg, app, cb) {
    var onstageServers = app.getServersByType('onstage');

    if(!onstageServers || onstageServers.length === 0) {
        cb(new Error('can not find onstage servers.'));
        return;
    }

    var res = dispatcher.dispatch(session.get('rid'), onstageServers);
    console.log("res-id:--------"+res.id);
    cb(null, res.id);
};

exp.im = function(session, msg, app, cb) {
    var imServers = app.getServersByType('im');

    if(!imServers || imServers.length === 0) {
        cb(new Error('can not find im servers.'));
        return;
    }

    var res = dispatcher.dispatch(session.get('rid'), imServers);

    cb(null, res.id);
};