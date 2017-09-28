/**
 * Created by root on 3/7/17.
 */
var Core = require("../core/Core");

Class({
    ClassName:"CPomelo.Handler.CBaseHandler",
    ctor:function(app)
    {
        this.app = app;
    }

}).Static({
    Create:function()
    {
        return new this
    }
})