/**
 * Created by Thinkpad on 2016/1/10.
 */
var twing = twing ||{ui:{},com:{},charts:{}};
twing.com.Scroller = (function() {
    function Scroller(arrItems,dir,dis) {
        if (!arrItems)return;

        this._arrItems = arrItems;
        this._dis = dis ? dis : 0;
        this._dir = dir == "v" ? "v" : "h";

        this.initialize();
    }

    var p = Scroller.prototype = new createjs.Container();
    p.Container_initialize = p.initialize;
    p.initialize = function () {
        p.Container_initialize();

        this._con = new createjs.Container();
        this.addChild(this._con);
        this.createView();
    };
    p.clearItems= function()
    {
        this._con.removeAllChildren();
        if(this._dir == "h")
        {
            this._con.x = 0;
        }
        else
        {
            this._con.y = 0;
        }
    };
    p.resetItems = function(arrItems)
    {
        this.clearItems();
        this._arrItems = arrItems;
        this.createView();
    };
    p.createView = function () {
        var i;
        var pos = 0;
        if (this._dir == "h") {
            for (i = 0; i < this._arrItems.length; i++) {
                this._arrItems[i].x = pos;
                pos += this._arrItems[i].width + this._dis;
                this._con.addChild(this._arrItems[i]);
            }
        } else {
            for (i = 0; i < this._arrItems.length; i++) {
                this._arrItems[i].y = pos;
                pos += this._arrItems[i].height + this._dis;
                this._con.addChild(this._arrItems[i]);
            }
        }
    };
    return Scroller;
})();