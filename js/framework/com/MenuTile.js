/**
 * Created by Thinkpad on 2016/3/19.
 */
var twing = twing ||{ui:{},com:{},charts:{}};
twing.com.MenuTile = (function() {
    function MenuTile(arrItems,itemW,itemH,dir,singleCount,hGap,vGap,selectedIndex,trigger,blLoop,loopTime,boolMouseRelCon,arrRelationContainer) {
        if (!arrItems)return;

        this._arrItems = arrItems;
        this._itemW = itemW;
        this._itemH = itemH;
        this._hGap = hGap!=null ? hGap : 0;
        this._vGap = vGap!=null ? vGap : 0;

        this._dir = dir == "v" ? "v" : "h";
        if(this._arrItems && selectedIndex >= 0 && selectedIndex < this._arrItems.length){
            this._selectedIndex = selectedIndex;
        }else{
            this._selectedIndex = 0;
        }
        this._trigger = trigger?trigger:"click";
        this._triggerFlg = 0;
        this._blLoop = ((typeof blLoop) == "undefined" || blLoop==null)?false:blLoop;
        this._loopTime = ((typeof loopTime) == "undefined" || loopTime==null)?1000:loopTime;
        this._loopFlg = 0;

        this._mouseRelFlag = false;
        this._boolMouseRelCon = boolMouseRelCon;
        this._arrRelationContainer = arrRelationContainer;
        this._singleCount = singleCount!=null?singleCount:10;
        this.setMouseRel();

        this._eventState = "auto";
        this.initialize();
    }
    createjs.EventDispatcher.initialize(MenuTile.prototype);
    var p = MenuTile.prototype = new createjs.Container();
    p.Container_initialize = p.initialize;
    p.initialize = function () {
        this.Container_initialize();
        this.createView();
    };
    p.clearItem= function()
    {
        clearInterval(this._loopFlg);
        if(this._arrItems)
        {
            for(var i=0;i<this._arrItems.length;i++)
            {
                this._arrItems[i].removeAllEventListeners();
            }
            this.removeAllChildren();
        }
    };
    p.resetItems = function(arrItems)
    {
        this.clearItem();
        this._arrItems = arrItems;
        this._selectedIndex = 0;
        this.createView();
    };
    p.resetPos = function()
    {
        var i,hIdx=0,vIdx=0;
        if (this._dir == "h") {
            for (i = 0; i < this._arrItems.length; i++) {
                hIdx = Math.floor(i/this._singleCount);
                vIdx = i%this._singleCount;
                this._arrItems[i].x =  (this._itemW + this._hGap) * vIdx;
                this._arrItems[i].y =  (this._itemH + this._vGap) * hIdx;
            }
        } else {
            for (i = 0; i < this._arrItems.length; i++) {
                vIdx = Math.floor(i/this._singleCount);
                hIdx = i%this._singleCount;
                this._arrItems[i].x =  (this._itemW + this._hGap) * vIdx;
                this._arrItems[i].y =  (this._itemH + this._vGap) * hIdx;
            }
        }
    };
    p.createView = function () {
        var i,hIdx=0,vIdx=0;
        if (this._dir == "h") {
            for (i = 0; i < this._arrItems.length; i++) {
                hIdx = Math.floor(i/this._singleCount);
                vIdx = i%this._singleCount;
                this._arrItems[i].x =  (this._itemW + this._hGap) * vIdx;
                this._arrItems[i].y =  (this._itemH + this._vGap) * hIdx;

                this._arrItems[i].setSelected(i == this._selectedIndex);
                this.addChild(this._arrItems[i]);
                this._arrItems[i].addEventListener(this._trigger, Global.delegate(this.onTrigMenuHandler, this));
                if(this._trigger == "mouseover")
                {
                    this._arrItems[i].addEventListener("mouseout", Global.delegate(this.onUnTrigMenuHandler, this));
                }
            }
        } else {
            for (i = 0; i < this._arrItems.length; i++) {
                vIdx = Math.floor(i/this._singleCount);
                hIdx = i%this._singleCount;
                this._arrItems[i].x =  (this._itemW + this._hGap) * vIdx;
                this._arrItems[i].y =  (this._itemH + this._vGap) * hIdx;

                this._arrItems[i].setSelected(i == this._selectedIndex);
                this.addChild(this._arrItems[i]);
                this._arrItems[i].addEventListener(this._trigger, Global.delegate(this.onTrigMenuHandler, this));
                if(this._trigger == "mouseover")
                {
                    this._arrItems[i].addEventListener("mouseout", Global.delegate(this.onUnTrigMenuHandler, this));
                }
            }
        }
        this.reBeginLoop();
    };
    p.stopLoop = function()
    {
        clearInterval(this._loopFlg);
    };
    p.reBeginLoop = function()
    {
        if(this._blLoop)
        {
            clearInterval(this._loopFlg);
            this._loopFlg = setInterval(Global.delegate(this.autoLoop,this),this._loopTime);
        }
    };
    p.autoLoop = function()
    {
        if((this._boolMouseRelCon && this._mouseRelFlag == false) || this._boolMouseRelCon == false)
        {
            if(this._arrItems && this._arrItems.length>1){
                var oldIndex = this._selectedIndex;
                this._selectedIndex ++;
                if(this._selectedIndex >=this._arrItems.length)
                {
                    this._selectedIndex = 0;
                }
                for (i = 0; i < this._arrItems.length; i++) {
                    this._arrItems[i].setSelected(i == this._selectedIndex);
                }

                if(oldIndex != this._selectedIndex)
                {
                    this._eventState = "auto";
                    if(Tools.browserType()==CONST.BROWER_IE)
                    {
                        this.dispatchEvent("MenuChangeEvent");
                    }else{
                        //this.dispatchEvent(new Event("MenuChangeEvent"));
                        this.dispatchEvent("MenuChangeEvent");
                    }
                }
            }
        }
    };
    p.onTrigMenuHandler = function (event) {
        this._triggerTarget = event.currentTarget;
        if(this._trigger == "mouseover"){
            this._triggerFlg = setTimeout(Global.delegate(this.triggerRun,this),300);
        }else {
            this.triggerRun();
        }
    };
    p.onUnTrigMenuHandler = function(event)
    {
        clearTimeout(this._triggerFlg);
    };
    p.triggerRun = function()
    {
        if(this._blLoop)
        {
            clearInterval(this._loopFlg);
            this._loopFlg = setInterval(Global.delegate(this.autoLoop,this),this._loopTime);
        }
        var oldIndex = this._selectedIndex;
        for (var i = 0; i < this._arrItems.length; i++) {
            if (this._arrItems[i] == this._triggerTarget) {
                this._arrItems[i].setSelected(true);
                this._selectedIndex = i;
            }
            else {
                this._arrItems[i].setSelected(false);
            }
        }
        if(oldIndex != this._selectedIndex)
        {
            this._eventState = "manual";
            if(Tools.browserType()==CONST.BROWER_IE)
            {
                this.dispatchEvent("MenuChangeEvent");
            }else{
                //this.dispatchEvent(new Event("MenuChangeEvent"));
                this.dispatchEvent("MenuChangeEvent");
            }
        }
    };
    p.setSelectedIndexWithEvent = function(idx)
    {
        if(this._arrItems != null)
        {
            if(idx<this._arrItems.length)
            {
                var oldIndex = this._selectedIndex;
                for (var i = 0; i < this._arrItems.length; i++) {
                    if(i == idx){
                        this._arrItems[i].setSelected(true);
                        this._selectedIndex = i;
                    }else {
                        this._arrItems[i].setSelected(false);
                    }
                }
                if(oldIndex != this._selectedIndex)
                {
                    this._eventState = "manual";
                    if(Tools.browserType()==CONST.BROWER_IE)
                    {
                        this.dispatchEvent("MenuChangeEvent");
                    }else{
                        //this.dispatchEvent(new Event("MenuChangeEvent"));
                        this.dispatchEvent("MenuChangeEvent");
                    }
                }
            }
        }
    };
    p.setSelectedIndexNoEvent = function(idx)
    {
        if(this._arrItems != null)
        {
            if(idx<this._arrItems.length)
            {
                for (var i = 0; i < this._arrItems.length; i++) {
                    if(i == idx){
                        this._arrItems[i].setSelected(true);
                        this._selectedIndex = i;
                    }else {
                        this._arrItems[i].setSelected(false);
                    }
                }
            }
        }
    };
    p.setBoolMouseRelCon = function(bl){
        this.clearOldMouseRel();
        this._boolMouseRelCon = bl;
        this.setMouseRel();
    };
    p.setArrRelationContainer = function(arr)
    {
        this.clearOldMouseRel();
        this._arrRelationContainer = arr;
        this.setMouseRel();
    };
    p.setArrRelationContainerAdd = function(arr)
    {
        this.clearOldMouseRel();
        if(this._arrRelationContainer == null){
            this._arrRelationContainer = [];
        }
        this._arrRelationContainer = this._arrRelationContainer.concat(arr);
        this.setMouseRel();
    };
    p.setArrRelationContainerRemove = function(arr)
    {
        this.clearOldMouseRel();
        if(this._arrRelationContainer == null){
            this._arrRelationContainer = [];
        }
        if(arr)
        {
            var idx;
            for(var i=0;i<arr.length;i++)
            {
                idx = this._arrRelationContainer.indexOf(arr[i]);
                if(idx != -1)
                {
                    this._arrRelationContainer.splice(idx,1);
                }
            }
        }
        this.setMouseRel();
    };
    p.clearOldMouseRel = function()
    {
        if(this._arrRelationContainer && this._arrRelationContainer.length>0)
        {
            for(var i=0;i<this._arrRelationContainer.length;i++)
            {
                this._arrRelationContainer[i].removeEventListener("mouseover",Global.delegate(this.openMouseRelFlag,this));
                this._arrRelationContainer[i].removeEventListener("mouseout",Global.delegate(this.closeMouseRelFlag,this));
            }
        }
    };
    p.setMouseRel = function(){
        if(this._boolMouseRelCon && this._arrRelationContainer && this._arrRelationContainer.length>0)
        {
            for(var i=0;i<this._arrRelationContainer.length;i++) {
                this._arrRelationContainer[i].addEventListener("mouseover", Global.delegate(this.openMouseRelFlag, this));
                this._arrRelationContainer[i].addEventListener("mouseout", Global.delegate(this.closeMouseRelFlag, this));
            }
        }
    };
    p.openMouseRelFlag = function(event)
    {
        if(this._arrRelationContainer) {
            if (this._arrRelationContainer.indexOf(event.currentTarget) != -1) {
                if (this._boolMouseRelCon) {
                    this.stopLoop();
                }
            }
        }
    };
    p.closeMouseRelFlag = function(event)
    {
        if(this._arrRelationContainer) {
            if (this._arrRelationContainer.indexOf(event.currentTarget) != -1) {
                if (this._boolMouseRelCon) {
                    this.reBeginLoop();
                }
            }
        }
    };

    p.getSelectedIndex = function () {
        return this._selectedIndex;
    };
    p.getSelectedItem = function () {
        return this._arrItems[this._selectedIndex];
    };
    p.getMenuItems = function () {
        return this._arrItems;
    };
    p.getEventState  = function () {
        return this._eventState;
    }
    return MenuTile;
})();


