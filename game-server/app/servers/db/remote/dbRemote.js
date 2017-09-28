/**
 * Created by root on 3/8/17.
 */

var consts = require('../../../consts/consts');
require('../../../core/Core');
require('../../../base/CBaseRemote');
require('../gameData/CDBDataCenter');
let logger = require('log4js').getLogger(__filename);

Class({
    ClassName:"CPomelo.Remote.CDBRemote",
    Base:"CPomelo.Remote.CBaseRemote",
    DataCenter:null,
    init:function(next)
    {
        next();
        this.DataCenter = Game.Data.CDBDataCenter.Instance;
    },
    GetUser:function(uid, cb)
    {
        // let self =this;
        this.DataCenter.SafeGetPerson(uid,function(person)
        {
            if(person)
            {
                logger.debug("GetUser-person:----------"+JSON.stringify(person));
                var userInfo = person.UserData;
                cb(null,userInfo);
                // const persons=self.DataCenter.GetPerson();
                // logger.debug('persons:-------'+JSON.stringify(persons));

                return;
            }
            cb(null,{code:consts.LOGIN.DB_GETINFO_ERROR})
        })
    },
    onUserLeave:function(uid, next)
    {
        next();
        this.DataCenter.removeUser(uid);
    }
})

module.exports = function(app) {
    return new CPomelo.Remote.CDBRemote(app);
};