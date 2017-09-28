/**
 * Created by Class on 2017/3/7.
 */

require("../../../base/Core");;
Class({
    ClassName:"Game.Data.CBaseCard",
    Color:
    {
        get:function()
        {
            return this.Face>>4;
        }
    },
    Num:
    {
        get:function()
        {
            return this.Face&0xF;
        }
    },
    ShowValue:null,
    ctor:function(f)
    {
        Object.defineProperty(this, "Face", {
            get: function () {
                return f;
            }
        });
    },
    toJSON:function()
    {
        return this.Face;
    }
})

