/**
 * Created by Thinkpad on 2016/3/18.
 */

var twing = twing ||{ui:{},com:{},charts:{}};
twing.com.DropDownList = (function () {
    function DropDownList(titleItemClass,listItemClass,w,h,r,dir,singleCount,hGap,vGap,itemW,itemH,listLeftLeading,listRightLeading,listTopLeading,listBottomLeading,alignState,trigger,blLoop,loopTime,boolMouseRelCon,arrRelationContainer)
    {
        this._titleItemClass = titleItemClass;
        this._listItemClass = listItemClass;
        this._w = w!=null?w:100;
        this._h = h!=null?h:25;
        this._r = r!=null?r:4;
        this._dir = dir=="v"?"v":"h";
        this._singleCount = singleCount!=null?singleCount:10;
        this._hGap = hGap!=null?hGap:3;
        this._vGap = vGap!=null?vGap:3;
        this._listLeftLeading = listLeftLeading != null?listLeftLeading:5;
        this._listRightLeading = listRightLeading != null?listRightLeading:5;
        this._listTopLeading = listTopLeading != null?listTopLeading:5;
        this._listBottomLeading = listBottomLeading !=null?listBottomLeading:5;

        this._itemW = itemW;
        this._itemH = itemH;
        this._trigger = trigger;
        this._blLoop = blLoop;
        this._loopTime = loopTime;
        this._boolMouseRelCon = boolMouseRelCon;
        this._arrRelationContainer = arrRelationContainer;

        this._blShowMenu = false;
        this._listItemsPool = [];
        this.aniDuration = 500;
        this.alignState = alignState!=null?alignState:"bottom_left";
        this.init();
        this.shapeW = 0;
        this.shapeH = 0;
    }
    var p = DropDownList.prototype = new createjs.Container();
    p.Container_initialize = p.initialize;
    p.init = function()
    {
        this.Container_initialize();
        this.createTitle();
        this.createMenuList();
    };
    p.setData = function(arrData,selectedIndex)
    {
        this._arrData = arrData;
        if(selectedIndex==null)selectedIndex=0;
        this.createListMenus(selectedIndex);
    };
    p.getDataCount = function()
    {
        if(this._arrData)
        {
            return this._arrData.length;
        }else{
            return 0;
        }
    };
    //创建标题
    p.createTitle = function(){
        this._menuTitle = new this._titleItemClass(this._w,this._h,this._r);
        this.addChild(this._menuTitle);
        this._menuTitle.addEventListener("click",Global.delegate(this.showOrCloseList,this));
    };
    //创建列表
    p.createMenuList = function(){
        if(this._listContainer == null){
            this._listContainer = new createjs.Container();
            this._listContainer.y = this._h+this._vGap;
            this._listContainer.alpha = 0;
            this.addChild(this._listContainer);
        }
        if (this.shapeList == null) {
            this.shapeList = new createjs.Shape();
            this._listContainer.addChild(this.shapeList);
        }
        if(this.menuList == null)
        {
            this.menuList = new twing.com.MenuTile([],this._itemW,this._itemH,this._dir,this._singleCount,this._hGap,this._vGap,
                0,this._trigger,this._blLoop,this._loopTime,this._boolMouseRelCon,this._arrRelationContainer);//,21,"h",5,10,3,4,"click",false,1000,false);
            this.menuList.x = this._listLeftLeading;
            this.menuList.y = this._listTopLeading;
            this._listContainer.addChild(this.menuList);
            this.menuList.addEventListener("MenuChangeEvent",Global.delegate(this.onMenuChange,this));
            this.menuList.addEventListener("click",Global.delegate(this.onMenuListClick,this));
        }
    };
    p.onMenuChange = function(evt)
    {
        this.dispatchEvent("SelectedChangeEvent");
        this._menuTitle.setData(this._arrData[this.menuList.getSelectedIndex()]);

    };
    p.onMenuListClick = function()
    {
        createjs.Tween.get(this._listContainer).to({alpha:0}, this.aniDuration,createjs.Ease.backIn);
        this._blShowMenu=false;
    };

    p.showOrCloseList = function(){
        createjs.Tween.removeTweens(this._listContainer);
        if(this._blShowMenu){
            createjs.Tween.get(this._listContainer).to({alpha:0}, this.aniDuration,createjs.Ease.backIn);
            this._blShowMenu=false;
        }else{
            this.showList();
            createjs.Tween.get(this._listContainer).to({alpha: 1}, this.aniDuration,createjs.Ease.backIn);
            this._blShowMenu=true;
        }
    };

    p.createListMenus = function(selectedIndex)
    {
        this.createListItem(this._arrData.length);
        var items = [];
        for(var i=0;i<this._arrData.length;i++)
        {
            items.push(this._listItemsPool[i]);
            this._listItemsPool[i].setData(this._arrData[i]);
        }
        this.menuList.resetItems(items);
        this.menuList.setSelectedIndexNoEvent(selectedIndex);
        this._menuTitle.setData(this._arrData[selectedIndex]);
    };
    p.createListItem = function(c)
    {
        if(this._listItemsPool.length<c)
        {
            var leg = this._listItemsPool.length;
            var cc = c-leg;
            var s;
            for(var i=0;i<cc;i++)
            {
                this._listItemsPool.push(new this._listItemClass());
            }
        }
    };
    //下拉框
    p.showList = function() {
        if(this._dir == "h"){
            if(this.getDataCount()>this._singleCount)//多行
            {
                var c = Math.ceil(this.getDataCount()/this._singleCount);//行数
                var sh = c*this._itemH + (c-1)*this._vGap + this._listTopLeading + this._listBottomLeading;
                var sw = this._singleCount*this._itemW + (this._singleCount-1)*this._hGap + this._listLeftLeading + this._listRightLeading;;

                this.shapeList.graphics.clear().setStrokeStyle(1)
                    .beginStroke("white")
                    .beginFill("rgb(14,28,64)")
                    .drawRoundRect(0, 0, sw, sh, this._r);
            }else{//单行
                var sh = this._itemH + this._listTopLeading + this._listBottomLeading;
                var sw = this.getDataCount()==0?this._w:this.getDataCount()*this._itemW + (this.getDataCount()-1)*this._hGap + this._listLeftLeading + this._listRightLeading;
                this.shapeList.graphics.clear().setStrokeStyle(1)
                    .beginStroke("white")
                    .beginFill("rgb(14,28,64)")
                    .drawRoundRect(0, 0, sw, sh, this._r);
            }
        }else{
            if(this.getDataCount()>this._singleCount)//多列
            {
                var c = Math.ceil(this.getDataCount()/this._singleCount);//列数
                var sw = c*this._itemW + (c-1)*this._hGap + this._listLeftLeading + this._listRightLeading;
                var sh = this._singleCount*this._itemH + (this._singleCount-1)*this._vGap + this._listTopLeading + this._listBottomLeading;

                this.shapeList.graphics.clear().setStrokeStyle(1)
                    .beginStroke("white")
                    .beginFill("rgb(14,28,64)")
                    .drawRoundRect(0, 0, sw, sh, this._r);
            }else{//单列
                var sw = this._itemW + this._listLeftLeading + this._listRightLeading;
                var sh = this.getDataCount()==0?this._itemH:this.getDataCount()*this._itemH + (this.getDataCount()-1)*this._vGap + this._listTopLeading + this._listBottomLeading;
                this.shapeList.graphics.clear().setStrokeStyle(1)
                    .beginStroke("white")
                    .beginFill("rgb(14,28,64)")
                    .drawRoundRect(0, 0, sw, sh, this._r);
            }
        }
        this.shapeW = sw;
        this.shapeH = sh;
        this.setContentAlign(this.alignState);
    };
    p.setContentAlign = function (str) {
        this.alignState = str;
        switch(str)
        {
            case "bottom_left": //下左
                this._listContainer.x = 0;
                this._listContainer.y = this._h+this._vGap;
                break;
            case "bottom_right": //下右
                this._listContainer.x = this._w - this.shapeW;
                this._listContainer.y = this._h+this._vGap;
                break;
            case "top_left": //上左
                this._listContainer.x = 0;
                this._listContainer.y = -this.shapeH;
                break;
            case "top_right": //上右
                this._listContainer.x = this._w - this.shapeW;
                this._listContainer.y = -this.shapeH;
                break;
            case "left_top": //左上
                this._listContainer.x = -this.shapeW;
                this._listContainer.y = 0;
                break;
            case "left_bottom": //左下
                this._listContainer.x = -this.shapeW;
                this._listContainer.y = this._h - this.shapeH;
                break;
            case "right_top": //右上
                this._listContainer.x = this._w;
                this._listContainer.y = 0;
                break;
            case "right_bottom":  //右下
                this._listContainer.x = this._w;
                this._listContainer.y = this._h - this.shapeH;
                break;
        }
    }

    p.getSelectedIndex = function () {
        return this.menuList.getSelectedIndex();
    };
    p.getSelectedItem = function () {
        return this._arrData[this.getSelectedIndex()];
    };
    p.getMenuTitle = function () {
        return this._menuTitle;
    }
    p.clearRes = function () {
        this._menuTitle.removeEventListener("click",Global.delegate(this.showOrCloseList,this));
        this._menuTitle.removeAllChildren();
        createjs.Tween.removeTweens(this._listContainer);
        this.menuList.removeEventListener("MenuChangeEvent",Global.delegate(this.onMenuChange,this));
        this.menuList.removeEventListener("click",Global.delegate(this.onMenuListClick,this));
        this.menuList.clearOldMouseRel();
        this.menuList.clearItem();
        if(this._listContainer)
        {
            this._listContainer.removeAllChildren();
        }
        this.removeAllChildren();
    }
    return DropDownList;
})();