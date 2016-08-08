/**
 * Created by Thinkpad on 2016/3/18.
 */

var twing = twing ||{ui:{},com:{},charts:{}};
twing.com.DropDownListDiv = (function () {
    function DropDownListDiv(globalDivX,globalDivY,divW,divH,mainView,titleDefaultName,className)
    {
        this._globalDivX = globalDivX!=null?globalDivX:"0px";
        this._globalDivY = globalDivY!=null?globalDivY:"0px";
        this._divW = divW!=null?divW:"184px";
        this._divH = divH!=null?divH:"30px";

        this.mainView = mainView;
        this.selectDiv = Tools.DDiv({left:this._globalDivX,top:this._globalDivY,width:this._divW,height:this._divH});
        if(titleDefaultName==null)titleDefaultName="表头";
        if(className != null){
            this.selectDiv.className = className;
        }else{
            this.selectDiv.className = "dropdownPayReset";
        }
        this.mainView.appendChild(this.selectDiv);

        this.select = document.createElement("select");
        this.select.style.cursor = "pointer";
        this.select.onchange = Global.delegate(this.onSelectedChangeEvent,this);
        this.select.options.add(new Option(titleDefaultName,titleDefaultName,true,true));
        this.select.style.width = this._divW;
        this.select.style.height = this._divH;
        //this.select.multiple="multiple";
        if(this._divW.indexOf("%")!=-1){
            //this.select.style.backgroundPositionX = this._divW-22;
            //this.select.style.backgroundPositionY = this._divH/2-5;
        }else{
            this.select.style.backgroundPositionX = (parseInt(this._divW)-22)+"px";
            this.select.style.backgroundPositionY = (parseInt(this._divH)/2-3)+"px";
        }

        this.selectDiv.appendChild(this.select);
        this.Container_initialize();
    }
    var p = DropDownListDiv.prototype = new createjs.Container();
    p.Container_initialize = p.initialize;
    p.setData = function(arrData,field,selectedIndex)
    {
        this._arrData = arrData;
        this._field = (field!=null && field!="")?field:"";
        if(selectedIndex==null)selectedIndex=0;

        this.select.options.length=0;
        for(var i=0; i<this._arrData.length; i++){
            if(this._field == ""){
                var _option = new Option(this._arrData[i],this._arrData[i]);
            }else{
                var _option = new Option(this._arrData[i][this._field],this._arrData[i]);
            }

            this.select.options.add(_option);
            if(i==selectedIndex)_option.selected = true;
        }
    };
    p.getDataCount = function()
    {
        return this.select.options.length;
    };

    p.onSelectedChangeEvent = function(evt)
    {
        this.dispatchEvent("SelectedChangeEvent");
    };

    p.getSelectedIndex = function () {
        return this.select.selectedIndex;
    };
    p.getSelectedData = function () {
        return this._arrData[this.select.selectedIndex];
    };
    p.getMenuTitle = function () {
        return this.select.options[this.select.selectedIndex].text;
    };
    p.getArrData = function(){
        return this._arrData;
    };
    p.setVisibled = function(bl){
        this.visible = bl;
        this.selectDiv.hidden = !bl;
    };
    p.clearRes = function () {
        this.select.options.length = 0;
        this.selectDiv.removeChild(this.select);
        this.mainView.removeChild(this.selectDiv);

        this.select = null;
        this.selectDiv = null;
    };
    return DropDownListDiv;
})();
