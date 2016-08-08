/**
 * Created by Thinkpad on 2016/3/17.
 */
var twing = twing ||{ui:{},com:{},charts:{}};
twing.com.TextWithShape = (function () {
    function TextWithShape()
    {
        this._txt = new createjs.Text();
        createjs.Text.apply(this._txt,arguments);
        this._shape = new createjs.Shape();
        this.init();
        Object.defineProperty(this, "text", {
            get: function(){return this._txt.text;},
            set: function (value) {
                this._txt.text = value;
                this.resetShapeSize();
            }
        });
    }
    var p = TextWithShape.prototype = new createjs.Container();
    p.Container_initialize = p.initialize;
    p.init = function(){
        this.Container_initialize();
        this.addChild(this._shape,this._txt);
        this.resetShapeSize();
    };
    p.resetShapeSize = function(){
        var w = this._txt.getMeasuredWidth();
        var h = this._txt.getMeasuredHeight();
        this._shape.graphics.clear();
        this._shape.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(0,0,w,h);
    };

    return TextWithShape;
})();