/**
 * Created by root on 3/8/17.
 */
require('../../../core/Core');
require('./CDBDataPerson');
let logger = require('log4js').getLogger(__filename);
Class({
    ClassName:"Game.Data.CDBDataCenter",
    Persons:null,
    OfflinePersons:null,
    ReadyClearPersons:null,
    ctor:function()
    {
        this.Persons = {};
        this.OfflinePersons = {};
        this.ReadyClearPersons = {};
        setTimeout(this.ClearPersons.bind(this),1000*60*60*24,this);
    },
    ClearPersons:function()
    {
        this.ReadyClearPersons = this.OfflinePersons;
        this.OfflinePersons = {};
    },
    SafeGetPerson:function(uid,cb)
    {
        var person = this.Persons[uid];
        if(person)
        {
            cb(person);
            return;
        }
        person = this.OfflinePersons[uid];
        if(person)
        {
            delete this.OfflinePersons[uid];
            this.Persons[uid] = person;
            cb(person);
            return;
        }
        person = this.ReadyClearPersons[uid];
        if(person)
        {
            delete this.ReadyClearPersons[uid];
            this.Persons[uid] = person;
            cb(person);
            return;
        }

        var self = this;
        Game.Data.CDBDataPerson.Create(uid,function(person)
        {
            if(person)
            {
                self.Persons[uid] = person;
                cb(person);
            }
            else
            {
                cb(null);
            }
        })
    },
    GetPerson:function () {
        const Persons = this.Persons;
        logger.debug("Persons:------"+JSON.stringify(Persons));
        return Persons;
    },
    removeUser:function(uid)
    {
        if(this.Persons.hasOwnProperty(uid))
        {
            this.OfflinePersons[uid]=this.Persons[uid];
            delete this.Persons[uid];
        }
    }

}).Static({
    Instance:Core.Instance
})