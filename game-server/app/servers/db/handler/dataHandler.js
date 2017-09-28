/**
 * Created by lenovo on 2017/7/5.
 */
require('../../../base/CBaseHandler');
require('../../../core/Core');
require('../gameData/CDBDataCenter');

let logger = require('log4js').getLogger(__filename);
Class({
    ClassName:"CPomelo.Handler.CDataHandler",
    Base:"CPomelo.Handler.CBaseHandler",
    getPersons:function(msg, session, next) {
        const isGetPersons = msg.isGetPersons;
        logger.debug('isGetPersons:-------' + isGetPersons);
        if (isGetPersons === 1) {
            var sessionService = this.app.get('sessionService');

            //duplicate log in
            var oldsession = sessionService.getByUid(uid);
            var sid = this.app.getServerId();
            if (!! oldsession){
                return false;
            }
            session.bind(uid);
            session.set('token',token);
            session.set('name',name);
            session.pushAll(function(err,data){});
            session.on('closed', this.onUserLeave.bind(null, this.app));


            return true;
            next (null,persons);
        }
    }
});

module.exports = function(app) {
    return new CPomelo.Handler.CDataHandler(app);
};