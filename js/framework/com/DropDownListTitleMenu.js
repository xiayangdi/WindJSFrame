/**
 * Created by Thinkpad on 2016/3/19.
 */
var twing = twing ||{ui:{},com:{},charts:{}};
twing.com.DropDownListTitleMenu = (function(){
    function DropDownListTitleMenu(w,h,r) {
        this._w = w;
        this._h = h;
        this._r = r;
        this.initialize();
    };
    var p = DropDownListTitleMenu.prototype = new createjs.Container();
    p.Container_initialize = p.initialize;
    p.initialize = function(){
        this.Container_initialize();
        this.createTriggerArea();
        this.createShapeTitle();
        this.createTextTitle();
        this.createShapeTriangular();
    };
    //表头框
    p.createShapeTitle = function()
    {
        if(this.shapeTitle == null){
            this.shapeTitle = new createjs.Shape();
            this.addChild(this.shapeTitle);
        }
        this.shapeTitle.graphics.clear().setStrokeStyle(1)
            .beginStroke("white")
            .beginFill("rgb(14,28,64)")
            .drawRoundRect(0,0,this._w,this._h,this._r);
    };
    //标头框文字
    p.createTextTitle = function()
    {
        if(this.textTitle == null){
            this.textTitle = new createjs.Text("", "15px 微软雅黑", "white");
            this.textTitle.textAlign = "center";
            this.textTitle.height = this._h;
            this.addChild(this.textTitle);
        }
        this.textTitle.x = this._w/2;
    };
    //右侧三角符号
    p.createShapeTriangular = function()
    {
        if(this.shapeTri == null)
        {
            this.shapeTri = new createjs.Shape();
            this.addChild(this.shapeTri);
        }
        this.shapeTri.x = this._w - 15;
        this.shapeTri.y = this._h/2 -2;
        this.shapeTri.graphics.clear().beginFill("white")
            .moveTo(0,0)
            .lineTo(10,0)
            .lineTo(5,5)
            .closePath();
    };
    //触发范围
    p.createTriggerArea = function()
    {
        if (this.shapeTriggerArea == null) {
            this.shapeTriggerArea = new createjs.Shape();
            this.shapeTriggerArea.cursor="pointer";
            this.addChild(this.shapeTriggerArea);
        }
        this.shapeTriggerArea.graphics.clear().beginFill("rgba(0,255,0,0.01)").drawRect(0,0,this._w,this._h);
    };
    p.setData = function(d)
    {
        this.textTitle.text = d.title;
    };
    return DropDownListTitleMenu;
})();
