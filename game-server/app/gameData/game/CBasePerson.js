/**
 * Created by Class on 2017/3/7.
 */
var logger = require('log4js').getLogger(__filename);
require("../../core/Core");
require("../../core/CMapArray");
require("./CBaseCard");
Class({
    ClassName:"Game.Data.CBasePerson",
    Cards:null,
    RoomId:{
        get:function()
        {
            return this.Room.RoomId;
        }
    },
    Room:null,
    Ready:false,
    Data:{
        get:function()
        {
            logger.debug('this.Data:------'+JSON.stringify(this.__Data));
            return this.__Data;
        },
        set:function(v)
        {
            this.__Data = {
                "userid": v.userid,
                "head": v.head,
                "sex": v.sex,
                "name": v.name,
                "point":0,
                "seat":this.Seat
            };
        }
    },
    Seat:0,
    m_pTimeout:null,
    ctor:function(uid,sid,room)
    {
        Object.defineProperty(this, "userid", {
            get: function () {
                return uid;
            }
        });
        Object.defineProperty(this, "sid", {
            get: function () {
                return sid;
            }
        });
        this.Room = room;
        this.Cards = new Core.mapArray("Face",this.CardsSortKeys);
    },
    AddCard:function(f)
    {
        this.Cards.InsertValue(new this.CardClass(f));
    },
    Auto:function()
    {
        this.m_pTimeout = null;
    },
    BeActive:function()
    {
        this.BeDeath();
        this.m_pTimeout = setTimeout(this.Auto,28*1000,this);
    },
    BeDeath:function()
    {
        if(this.m_pTimeout)
        {
            clearTimeout(this.m_pTimeout);
        }
        this.m_pTimeout = null;
    },
    toJSON:function()
    {
        return this.Data;
    }
})