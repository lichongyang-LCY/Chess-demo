/**
 * Created by Administrator on 2016/11/24.
 */
if(!String.prototype.Format)
{
    String.Parse = function(a) {
        if (void 0 === a || null === a) return "(" + String(a) + ")";
        if (a.constructor === String || a.constructor === Number) return a;
        if (a instanceof Function) return  "[" + a.toString() + "]";
        if (a instanceof Array) try {
            return JSON.stringify(a)
        } catch(c) {
            Class.Assert(!1, c)
        }
        try {
            return JSON.stringify(a)
        } catch(e) {
            Class.Assert(!1, e)
        }
        return "(error)"
    };
    String.prototype.Format = function(){
        var a = arguments;
        if (1 === a.length) {
            var c = a[0];
            if (c instanceof Array) a = c;
            else if (c.constructor === Object) {
                var e = /{([^{}]+)}/gm;
                return this.replace(e,
                    function(a, b) {
                        return c.hasOwnProperty(b) ? String.Parse(c[b]) : a
                    })
            }
        }
        e = /{(\d+)}/gm;
        return this.replace(e,
            function(c, d) {
                return~~d < a.length ? String.Parse(a[~~d]) : c
            })
    }

    function a(a, c, e, f) {
        var g;
        return g = function() {
            c ? a.apply(c, e) : a.apply(null, e);
            f && clearTimeout(g)
        }
    }
    function c(b) {
        return function(c, e, f, g) {
            c = a(c, f, g);
            return b(c, e)
        }
    }
    global.setTimeout = c(setTimeout);
    global.setInterval = c(setInterval)
}
