/**
 * Created by root on 3/8/17.
 */

require('../../../core/Core');
require('../../../gameData/user/CUserData');
Class({
    ClassName:"Game.Data.CDBDataPerson",
    UserData:null,

}).Static({
    Create:function(uid,cb)
    {
        var self = this;
        Game.Data.CUserData.CreateByMysqlByUid(uid,function(err,data)
        {
            if(err)
            {
                cb(null);
                return;
            }

            var person = new self;
            person.UserData = data;
            cb(person);
        })

    }
})