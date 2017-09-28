/**
 * Created by Class on 2017/3/7.
 */

require("../../core/Core");
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


//for(var i=1;i<4;i++)
//{
//    for(var j=2;j<15;j++)
//    {
//        var num = i<<4|j;
//        Cards.push(new CCard(num));
//    }
//}