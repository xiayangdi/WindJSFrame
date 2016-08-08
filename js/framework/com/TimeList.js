/**
 * Created by Thinkpad on 2016/3/24.
 */
var twing = twing ||{ui:{},com:{},charts:{}};
twing.com.TimeList = (function () {
    function TimeList(id,globalX,globalY,txtW,txtH,mainView,timeStyle,titleDefaultName,textStyleObj)
    {
        this.initialize();
        this._id = id;
        this._globalX = globalX!=null?globalX:"0px";
        this._globalY = globalY!=null?globalY:"0px";
        this._txtW = txtW!=null?txtW:"184px";
        this._txtH = txtH!=null?txtH:"30px";

        this.mainView = mainView;
        this._timeStyle = timeStyle!=null?timeStyle:"YYYY-MM-DD hh:mm:ss";

        this.timeDiv = Tools.DDiv({left:this._globalX,top:this._globalY,width:this._txtW,height:this._txtH});
        //if(titleDefaultName==null){
        //    var date = new Date();
        //    if(this._timeStyle.indexOf("ss")== -1){
        //        titleDefaultName = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes();
        //    }else{
        //        titleDefaultName = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes() + ":" + date.getSeconds();
        //    }
        //}

        this.mainView.appendChild(this.timeDiv);
        this.timeTxt = document.createElement("input");
        this.timeTxt.style.cursor = "pointer";
        this.timeTxt.type="text";
        this.timeTxt.name= this._id;
        this.timeTxt.id= this._id;

        this.timeTxt.style.width = this._txtW;
        this.timeTxt.style.height = this._txtH;

        if(textStyleObj!=null){
            if(textStyleObj.backgroundColor)this.timeTxt.style.backgroundColor = textStyleObj.backgroundColor;
            if(textStyleObj.color)this.timeTxt.style.color = textStyleObj.color;
            if(textStyleObj.fontSize)this.timeTxt.style.fontSize = textStyleObj.fontSize;
            if(textStyleObj.borderWidth)this.timeTxt.style.borderWidth = textStyleObj.borderWidth;
            if(textStyleObj.textAlign)this.timeTxt.style.textAlign = textStyleObj.textAlign;
            if(textStyleObj.readonly)this.timeTxt.style.readonly = textStyleObj.readonly;
        }else{
            this.timeTxt.style.backgroundColor = "#050f2b";
            this.timeTxt.style.color = "#ffffff";
            this.timeTxt.style.fontSize = "14pt";
            this.timeTxt.style.borderWidth = "1px";
            this.timeTxt.style.textAlign = "left";
            this.timeTxt.style.readonly = "readonly";
        }



        this.timeTxt.className = "laydate-icon";
        //this.startTimeTxt.placeholder="YYYY-MM-DD hh:mm:ss";
        if(titleDefaultName == null){
            this.setTime(new Date());
        }else{
            this.timeTxt.value=titleDefaultName;
        }
        this.timeTxt.onclick = Global.delegate(this.createLayDate,this);
        //this.timeTxt.onchange = Global.delegate(this.onChangeEvent,this);
        this.timeDiv.appendChild(this.timeTxt);
    }
    var p = TimeList.prototype = new createjs.Container();
    p.setStrTime = function(t){
        this.timeTxt.value = t;
    };
    p.setTime = function(date){
        var y = date.getFullYear();
        var mo = date.getMonth()+1;
        var d = date.getDate();
        var h = date.getHours();
        var mi = date.getMinutes();
        var s = date.getSeconds();
        y = y<10?"0"+y:y;
        mo = mo<10?"0"+mo:mo;
        d = d<10?"0"+d:d;
        h = h<10?"0"+h:h;
        mi = mi<10?"0"+mi:mi;
        s = s<10?"0"+s:s;

        var strTime = y+"-"+mo+"-"+d+" "+h+":"+mi+":"+s;
        this.timeTxt.value = strTime;
    };
    p.onChangeEvent = function(event){
        this.dispatchEvent("TimeChange");
    };
    p.createLayDate = function (event) {
        laydate({
            elem: '#'+this._id,
            istime: true,
            format: this._timeStyle,
            choose:Global.delegate(this.onChangeEvent,this),
        });
    };
    p.getTime = function(){
        var date ;
        var str = this.timeTxt.value;
        if(str!="")
        {
            var temp = str.toString();
            temp = temp.replace(/-/g, "/");
            date = new Date(Date.parse(temp));
        }else
        {
            date = new Date();
        }
        return date;
    };
    p.getStringTime = function(){
        return this.timeTxt.value;
    };
    p.setVisibled = function(bl){
        this.visible = bl;
        this.timeDiv.hidden = !bl;
    };
    p.clearRes = function () {
        this.timeDiv.removeChild(this.timeTxt);
        this.mainView.removeChild(this.timeDiv);

        this.timeTxt = null;
        this.timeDiv = null;
    };
    return TimeList;
})();
