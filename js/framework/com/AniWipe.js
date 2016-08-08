/**
 * Created by Thinkpad on 2016/5/16.
 */
var twing = twing ||{ui:{},com:{},charts:{}};
twing.com.AniWipe = (function()
{
    function AniWipe(itemClass,align,maskWW,maskHH,lastTime,aniTime)
    {
        this.initialize(itemClass,align,maskWW,maskHH,lastTime,aniTime);
    }
    var p = AniWipe.prototype = new createjs.Container();
    p.Container_initialize = p.initialize;
    p.initialize = function(itemClass,align,maskWW,maskHH,lastTime,aniTime)
    {
        this.Container_initialize();
        this._itemClass = itemClass;
        this._align = align!="h"?"v":"h";
        this._maskWW = maskWW==null?100:maskWW;
        this._maskHH = maskHH==null?100:maskHH;
        this._lastTime = lastTime==null?5000:lastTime;
        this._aniTime = aniTime==null?500:aniTime;

        this._arrData = [];
        this._curIndex = 0;
        this._flag = 0;

        if(this._align == "h"){
            this.tempBeginX = maskWW;
            this.tempBeginY = 0;
            this.aniXOff = -maskWW;
            this.aniYOff = 0;
        }else{
            this.tempBeginX = 0;
            this.tempBeginY = maskHH;
            this.aniXOff = 0;
            this.aniYOff = -maskHH;
        }

        this.createMask();
        this.createItem();
    };
    p.createMask = function () {
        var maskSp = new createjs.Shape();
        maskSp.graphics.beginFill("#ffffff");
        maskSp.graphics.drawRect(0,0,this._maskWW,this._maskHH);
        maskSp.graphics.endFill();
        this.mask = maskSp;
    };
    p.createItem = function()
    {
        this.showItem = new this._itemClass();
        this.tempItem = new this._itemClass();
        this.tempItem.x = this.tempBeginX;
        this.tempItem.y = this.tempBeginY;
        this.addChild(this.showItem,this.tempItem);
    };
    p.setData = function(arrData){
        this.clearData();
        this._arrData = arrData;
        this._curIndex = 0;
        this.showItem.setData(this._arrData[this._curIndex]);
        this._flag = setTimeout(Global.delegate(this.aniNext,this),this._lastTime);
    };
    p.aniNext = function(){
        this._curIndex += 1;
        if(this._curIndex>=this._arrData.length){
            this._curIndex = 0;
        }
        this.tempItem.setData(this._arrData[this._curIndex]);
        createjs.Tween.get(this.showItem).to({x:this.aniXOff,y:this.aniYOff},this._aniTime).call(Global.delegate(this.aniOver,this));
        createjs.Tween.get(this.tempItem).to({x:0,y:0},this._aniTime);
    };
    p.aniOver = function(){
        var temp = this.tempItem;
        this.tempItem = this.showItem;
        this.showItem = temp;
        this.tempItem.x = this.tempBeginX;
        this.tempItem.y = this.tempBeginY;
        this._flag = setTimeout(Global.delegate(this.aniNext,this),this._lastTime);
    };
    p.clearData = function(){
        clearTimeout(this._flag);
        createjs.Tween.removeTweens(this.showItem);
        createjs.Tween.removeTweens(this.tempItem);
        this.showItem.x = 0;
        this.showItem.y = 0;
        this.tempItem.x = this.tempBeginX;
        this.tempItem.y = this.tempBeginY;
        this.showItem.setData(null);
        this.tempItem.setData(null);
    };
    return AniWipe;
})();
