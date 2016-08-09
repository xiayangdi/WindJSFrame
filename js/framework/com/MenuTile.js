/**
 * Created by wind on 2016/3/19.
 */
import CONST from '../utils/CONST.js';
import Tools from '../utils/Tools.js';
import args from './../../libs/createjs/createjs.js';
class MenuTile extends createjs.Container{
    constructor(arrItems,itemW,itemH,dir,singleCount,hGap,vGap,selectedIndex,trigger,blLoop,loopTime,boolMouseRelCon,arrRelationContainer) {
        super();

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
        this._boolMouseRelCon = boolMouseRelCon===true?true:false;
        this._arrRelationContainer = arrRelationContainer;
        this._singleCount = singleCount!=null?singleCount:10;
        this.setMouseRel();

        this._eventState = "auto";

        this.createView();
    }
    clearItem(){
        clearInterval(this._loopFlg);
        if(this._arrItems)
        {
            for(var i=0;i<this._arrItems.length;i++)
            {
                this._arrItems[i].removeAllEventListeners();
            }
            this.removeAllChildren();
        }
    }
    resetItems(arrItems){
        this.clearItem();
        this._arrItems = arrItems;
        this._selectedIndex = 0;
        this.createView();
    }
    resetPos(){
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
    }
    createView(){
        var i,hIdx=0,vIdx=0;
        if (this._dir == "h") {
            for (i = 0; i < this._arrItems.length; i++) {
                hIdx = Math.floor(i/this._singleCount);
                vIdx = i%this._singleCount;
                this._arrItems[i].x =  (this._itemW + this._hGap) * vIdx;
                this._arrItems[i].y =  (this._itemH + this._vGap) * hIdx;

                this._arrItems[i].selected = (i == this._selectedIndex);
                this.addChild(this._arrItems[i]);
                this._arrItems[i].addEventListener(this._trigger, this.onTrigMenuHandler);
                if(this._trigger == "mouseover")
                {
                    this._arrItems[i].addEventListener("mouseout", this.onUnTrigMenuHandler);
                }
            }
        } else {
            for (i = 0; i < this._arrItems.length; i++) {
                vIdx = Math.floor(i/this._singleCount);
                hIdx = i%this._singleCount;
                this._arrItems[i].x =  (this._itemW + this._hGap) * vIdx;
                this._arrItems[i].y =  (this._itemH + this._vGap) * hIdx;

                this._arrItems[i].selected = (i == this._selectedIndex);
                this.addChild(this._arrItems[i]);
                this._arrItems[i].addEventListener(this._trigger, this.onTrigMenuHandler);
                if(this._trigger == "mouseover")
                {
                    this._arrItems[i].addEventListener("mouseout", this.onUnTrigMenuHandler);
                }
            }
        }
        this.reBeginLoop();
    }
    stopLoop(){
        clearInterval(this._loopFlg);
    }
    reBeginLoop (){
        if(this._blLoop)
        {
            clearInterval(this._loopFlg);
            this._loopFlg = setInterval(this.autoLoop,this._loopTime);
        }
    }
    autoLoop = ()=>{
        if((this._boolMouseRelCon && this._mouseRelFlag == false) || this._boolMouseRelCon == false){
            if(this._arrItems && this._arrItems.length>1){
                var oldIndex = this._selectedIndex;
                this._selectedIndex ++;
                if(this._selectedIndex >=this._arrItems.length){
                    this._selectedIndex = 0;
                }
                for (let i = 0; i < this._arrItems.length; i++) {
                    this._arrItems[i].selected = (i == this._selectedIndex);
                }

                if(oldIndex != this._selectedIndex){
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
    onTrigMenuHandler = (event)=>{
        this._triggerTarget = event.currentTarget;
        if(this._trigger == "mouseover"){
            this._triggerFlg = setTimeout(this.triggerRun,300);
        }else {
            this.triggerRun();
        }
    };
    onUnTrigMenuHandler = (event) => {
        clearTimeout(this._triggerFlg);
    };
    triggerRun = () => {
        if(this._blLoop)
        {
            clearInterval(this._loopFlg);
            this._loopFlg = setInterval(this.autoLoop,this._loopTime);
        }
        var oldIndex = this._selectedIndex;
        for (var i = 0; i < this._arrItems.length; i++) {
            if (this._arrItems[i] == this._triggerTarget) {
                this._arrItems[i].selected = true;
                this._selectedIndex = i;
            }
            else {
                this._arrItems[i].selected = false;
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
    setSelectedIndexWithEvent(idx){
        if(this._arrItems != null)
        {
            if(idx<this._arrItems.length)
            {
                var oldIndex = this._selectedIndex;
                for (var i = 0; i < this._arrItems.length; i++) {
                    if(i == idx){
                        this._arrItems[i].selected = true;
                        this._selectedIndex = i;
                    }else {
                        this._arrItems[i].selected = false;
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
    }
    setSelectedIndexNoEvent(idx){
        if(this._arrItems != null)
        {
            if(idx<this._arrItems.length)
            {
                for (var i = 0; i < this._arrItems.length; i++) {
                    if(i == idx){
                        this._arrItems[i].selected = true;
                        this._selectedIndex = i;
                    }else {
                        this._arrItems[i].selected = false;
                    }
                }
            }
        }
    }
    setBoolMouseRelCon(bl){
        this.clearOldMouseRel();
        this._boolMouseRelCon = bl;
        this.setMouseRel();
    }
    setArrRelationContainer(arr){
        this.clearOldMouseRel();
        this._arrRelationContainer = arr;
        this.setMouseRel();
    }
    setArrRelationContainerAdd(arr){
        this.clearOldMouseRel();
        if(this._arrRelationContainer == null){
            this._arrRelationContainer = [];
        }
        this._arrRelationContainer = this._arrRelationContainer.concat(arr);
        this.setMouseRel();
    }
    setArrRelationContainerRemove(arr){
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
    }
    clearOldMouseRel(){
        if(this._arrRelationContainer && this._arrRelationContainer.length>0)
        {
            for(var i=0;i<this._arrRelationContainer.length;i++)
            {
                this._arrRelationContainer[i].removeEventListener("mouseover",this.openMouseRelFlag);
                this._arrRelationContainer[i].removeEventListener("mouseout",this.closeMouseRelFlag);
            }
        }
    }
    setMouseRel(){
        if(this._boolMouseRelCon && this._arrRelationContainer && this._arrRelationContainer.length>0)
        {
            for(var i=0;i<this._arrRelationContainer.length;i++) {
                this._arrRelationContainer[i].addEventListener("mouseover", this.openMouseRelFlag);
                this._arrRelationContainer[i].addEventListener("mouseout", this.closeMouseRelFlag);
            }
        }
    }
    openMouseRelFlag = (event)=>{
        if(this._arrRelationContainer) {
            if (this._arrRelationContainer.indexOf(event.currentTarget) != -1) {
                if (this._boolMouseRelCon) {
                    this.stopLoop();
                }
            }
        }
    };
    closeMouseRelFlag = (event)=>{
        if(this._arrRelationContainer) {
            if (this._arrRelationContainer.indexOf(event.currentTarget) != -1) {
                if (this._boolMouseRelCon) {
                    this.reBeginLoop();
                }
            }
        }
    };

    get selectedIndex() {
        return this._selectedIndex;
    }
    get selectedItem() {
        return this._arrItems[this._selectedIndex];
    }
    get menuItems() {
        return this._arrItems;
    }
    get eventState() {
        return this._eventState;
    }
}

export default MenuTile;
