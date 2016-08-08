/**
 * Created by Administrator on 2016/2/22.
 */
var twing = twing ||{ui:{},com:{},charts:{}};
twing.com.Scroll = (function()
{
    function Scroll(con,mask,pageNum,align)
    {
        this.initialize(con,mask,pageNum,align);
    }
    var p = Scroll.prototype = new createjs.Container();
    p.Container_initialize = p.initialize;
    p.initialize = function(con,maskObj,pageNum,align)
    {
        this.Container_initialize();
        this.container = con;
        this.maskObj =maskObj;
        this.align = align==null?"h":align;
        this.pageNum = pageNum ==null?8:pageNum;

        this.addChild(this.container);
        this.pageCount = Math.ceil(this.container.numChildren/this.pageNum);

        this._coor = this.align=="h"?"x":"y";
        this._length = this._coor=="x"?"width":"height";

        //this.
        this.createMask();
        this.createItem();
    }
    p.createItem = function()
    {
        var itemArr = []
        for(var i=0;i<this.pageCount;i++)
        {
            itemArr.push(new twing.com.MenuItemText(i+1,10,10));
        }
        this.menu = new twing.com.Menu(itemArr,10,"h");
        this.addChild(this.menu);
        this.menu.x = this.maskObj.x + this.maskObj.width -this.menu.getWidth();
        this.menu.y = this.maskObj.y +this.maskObj.height;
        this.menu.addEventListener("MenuChangeEvent",Global.delegate(this.changeMenuHandler,this));
    }
    p.createMask = function () {
        var maskSp = new createjs.Shape();
        maskSp.graphics.beginFill("#ffffff");
        maskSp.graphics.drawRect(this.maskObj.x,this.maskObj.y,this.maskObj.width,this.maskObj.height);
        maskSp.graphics.endFill();
        this.container.mask = maskSp;
    }
    p.changeMenuHandler = function(evt)
    {
        this.setCurrentIndex(this.menu.getSelectedIndex());
    }
    p.refresh = function () {
        this.pageCount = Math.ceil(this.container.numChildren/this.pageNum);
        var itemArr = []
        for(var i=0;i<this.pageCount;i++)
        {
            itemArr.push(new twing.com.MenuItemText(i+1,10,10));
        }
        this.menu.resetItems(itemArr);
        this.menu.x = this.maskObj.x + this.maskObj.width -this.menu.getWidth();
        this.menu.y = this.maskObj.y +this.maskObj.height ;
    }
    p.setCurrentIndex = function(index)
    {
        var tweenObj = {};
        tweenObj[this._coor] = -index * this.maskObj[this._length] + this.maskObj[this._coor];
        //TweenLite.to(this.container,100,tweenObj)
        createjs.Tween.get(this.container).to(tweenObj,100);
    }
    return Scroll;
})();
