/**
 * Created by Thinkpad on 2016/3/18.
 */
var twing = twing ||{ui:{},com:{},charts:{}};
twing.com.DropDownListMultipleDiv = (function () {
    var that,total=1;
    function DropDownListMultipleDiv(globalDivX,globalDivY,divW,divH,mainView,mustHasOne,unSelectedTitle,className,selectedColor)
    {
        this.alarmFlag = 0;

        this._globalDivX = globalDivX!=null?globalDivX:"0px";
        this._globalDivY = globalDivY!=null?globalDivY:"0px";
        this._divW = divW!=null?divW:"184px";
        this._divH = divH!=null?divH:"30px";

        this.mainView = mainView;
        this.mustHasOne = mustHasOne == true?true:false;

        this.containerDivShow=false;
        if(selectedColor==null){
            this._selectedColor = "#1E90FF";
        }else{
            this._selectedColor = selectedColor;
        }

        this.containerDiv = Tools.DDiv({left:this._globalDivX,top:this._globalDivY,width:this._divW+'px',height:this._divH+'px'});
        if(unSelectedTitle==null){
            this._unSelectedTitle = "请选择";
        }else{
            this._unSelectedTitle = unSelectedTitle;
        }
        if(className != null){
            this.containerDiv.className = className;
        }else{
            this.containerDiv.className = "dropDownListMultipleDiv";
        }
        this.mainView.appendChild(this.containerDiv);
        this.nameFlag = "DropDownListMultipleDiv_"+Math.random()*10000;
        //点击打开选择框
        this.title = document.createElement('div');
        this.title.style.cursor = "pointer";
        this.title.style.width = this._divW;
        this.title.style.height = this._divH;
        this.title.style.lineHeight = this._divH;
        this.title.style.position ='relative';
        //this.title.style.top ='-5px';
        // this.title.style.borderRadius ='5px';
        //this.title.style.paddingLeft = '5px';
        //this.title.style.paddingRight = '5px';
        this.title.style.backgroundPositionX = (parseInt(this._divW) - 22) +"px";
        this.title.style.backgroundPositionY = (parseInt(this._divH)/2 - 2) +"px";
        this.title.setAttribute('id', "title");
        this.title.setAttribute('nameFlag', this.nameFlag);
        this.title.innerHTML = this._unSelectedTitle;
        this.containerDiv.appendChild(this.title);
        //全选全不选
        //this.selectAll = document.createElement('span');
        //this.selectAll.style.cursor = "pointer";
        //this.selectAll.style.backgroundColor = 'white';
        //this.selectAll.innerHTML = '全选';
        //this.selectAll.setAttribute('class', 'noremovebgc');
        //this.selectAll.style.position ='relative';
        //this.selectAll.style.top ='-5px';
        //this.selectAll.style.left ='5px';
        //this.containerDiv.appendChild(this.selectAll);
        //选择框
        this.listDiv = document.createElement("div");
        this.listDiv.style.cursor = "pointer";
        this.listDiv.style.overflow = "scroll";
        this.listDiv.style.overflowX = "hidden";
        this.listDiv.style.overflowY = "auto";
        //this.listDiv.style.background = 'rgb(15,15,43)';
        //this.listDiv.style.color = 'white';
        //this.listDiv.style.outline = '1px solid white';
        this.listDiv.style.display = 'none';
        this.listDiv.style.maxHeight = "500px";
        this.listDiv.style.width =  this._divW;
        this.listDiv.setAttribute('id', "listDiv");
        this.listDiv.setAttribute('nameFlag', this.nameFlag);
        this.containerDiv.appendChild(this.listDiv);
        //打开关闭选择框
        this.title.addEventListener('click',Global.delegate(this.onTitleClicked,this));
        window.addEventListener('click', Global.delegate(this.onOtherClicked,this));
        this.listDiv.addEventListener('click',Global.delegate(this.onListClicked,this),false);
        // this.Container_initialize();

        this._arrData = [];
        this._field = "";
        this._arrSelectedIndexes = [];
        this._itemList = [];
    }
    var p = DropDownListMultipleDiv.prototype = new createjs.Container();
    p.Container_initialize = p.initialize;
    p.onListClicked = function(e){
        var node = e.target;
        //if(node.nodeName === 'SPAN'||node.nodeName === 'INPUT'){
        if(node.nodeName === 'SPAN'||node.nodeName === 'IMG'){
            node = node.parentNode;
        }
        if(node.getAttribute("AllFlag") == "true"){
            if(this._arrSelectedIndexes.length == this._itemList.length){
                for(var i=0;i<this._itemList.length;i++){
                    this.setUnselectedByIndex(i);
                }
            }else{
                for(var i=0;i<this._itemList.length;i++){
                    this.setSelectedByIndex(i);
                }
            }
            this.dispatchEvent("SelectedChangeEvent");
            return;
        }
        var idx = this._itemList.indexOf(node);
        if(idx != -1){
            if(this._arrSelectedIndexes.indexOf(idx)!=-1){
                this.setUnselectedByIndex(idx);
            }else{
                this.setSelectedByIndex(idx);
            }
            this.dispatchEvent("SelectedChangeEvent");
        }
    };
    p.setSelectedByIndex = function(idx){
        if(this._arrSelectedIndexes.indexOf(idx) == -1){
            this._arrSelectedIndexes.push(idx);
        }
        this._arrSelectedIndexes.sort();
        this._itemList[idx].style.backgroundColor = this._selectedColor;
        //this._itemList[idx].firstChild.setAttribute('checked', true);
        this._itemList[idx].firstChild.src = "assets/bg/gou.png";
        if(this._arrData.length==this._arrSelectedIndexes.length){
            if(this.allChooseItem!=null){
                this.allChooseItem.style.backgroundColor = this._selectedColor;
                //this.allChooseItem.firstChild.setAttribute('checked', true);
                this.allChooseItem.firstChild.src = "assets/bg/gou.png";
            }
        }
        this.setTitle();
    };
    p.setUnselectedByIndex = function(idx){
        var ii = this._arrSelectedIndexes.indexOf(idx);
        if(ii != -1){
            this._arrSelectedIndexes.splice(ii,1);
        }
        this._arrSelectedIndexes.sort();
        this._itemList[idx].style.backgroundColor = 'transparent';
        //this._itemList[idx].firstChild.removeAttribute('checked');
        this._itemList[idx].firstChild.src = "assets/bg/wugou.png";
        if(this.allChooseItem!=null){
            this.allChooseItem.style.backgroundColor =  'transparent';
            //this.allChooseItem.firstChild.setAttribute('checked', true);
            this.allChooseItem.firstChild.src = "assets/bg/wugou.png";
        }
        this.setTitle();
        if(this.mustHasOne && this._arrSelectedIndexes.length == 0){
            this.setSelectedByIndex(0);
        }
    };
    p.onOtherClicked = function(e){
        if(e.target.getAttribute("nameFlag")  === this.nameFlag ){
            return ;
        }else{
            this.setListVisibled(false);
        }
    };
    p.onTitleClicked = function(){
        if(this.containerDivShow){
            this.setListVisibled(false);
        } else {
            this.setListVisibled(true);
        }
    };
    p.setListVisibled = function(bl){
        this.containerDivShow = bl;
        if(bl){
            this.listDiv.style.display = 'block';
            this.containerDiv.style.zIndex = 10;
        }else{
            this.listDiv.style.display = 'none';
            this.containerDiv.style.zIndex = 0;
        }
    };
    p.clearList = function(){
        this.setListVisibled(false);
        this.listDiv.innerHTML='';
        this.allChooseItem = null;
        this._arrData = [];
        this._field = "";
        this._arrSelectedIndexes = [];
        this._itemList = [];
    };
    p.createList = function(){
        var item;
        if(this._arrData.length>1){
            this.allChooseItem = this.createListItem("全选",this._arrData.length==this._arrSelectedIndexes.length);
            this.allChooseItem.setAttribute('AllFlag',"true");
            this.listDiv.appendChild(this.allChooseItem);
        }
        for(var i=0;i<this._arrData.length;i++){
            if(this._field == ""){
                item = this.createListItem(this._arrData[i],this._arrSelectedIndexes.indexOf(i)!= -1);
            }else{
                item = this.createListItem(this._arrData[i][this._field],this._arrSelectedIndexes.indexOf(i)!= -1);
            }
            this.listDiv.appendChild(item);
            this._itemList.push(item);
        }
    };
    p.createListItem = function(txt,blChecked){
        var item = document.createElement('div');
        item.style.width = this._divW;
        item.style.height = this._divH;
        //item.setAttribute('index', i);
        item.setAttribute('nameFlag', this.nameFlag);
        var txtItem = document.createElement('span');
        txtItem.style.display = 'inline-block';
        //txtItem.style.paddingLeft = '10px';
        //txtItem.style.paddingRight = '10px';
        txtItem.innerHTML = txt;
        txtItem.setAttribute('nameFlag', this.nameFlag);

        var checkedItem = document.createElement('img');
        checkedItem.style.paddingLeft = "4px";
        checkedItem.style.paddingRight = "4px";
        checkedItem.src = "assets/bg/wugou.png";
        //checkedItem.setAttribute('type', 'checkbox');
        checkedItem.setAttribute('nameFlag', this.nameFlag);
        item.appendChild(checkedItem);
        item.appendChild(txtItem);

        item.style.backgroundColor = blChecked ?this._selectedColor:'transparent';
        if(blChecked){
            checkedItem.src = "assets/bg/gou.png";
            //checkedItem.setAttribute('checked', true);
        }else{
            checkedItem.src = "assets/bg/wugou.png";
            //checkedItem.removeAttribute('checked');
        }
        return item;
    };
    p.setTitle = function(){
        if(this._arrData.length == 0){
            this.title.innerHTML = "无数据";
            return;
        }
        if(this._arrSelectedIndexes.length>0){
            this.closeAlert();
        }
        if(this._arrSelectedIndexes.length == 0){
            this.title.innerHTML = this._unSelectedTitle;
        }else if(this._arrSelectedIndexes.length == 1){
            if(this._field == ""){
                this.title.innerHTML = this._arrData[this._arrSelectedIndexes[0]];
            }else{
                this.title.innerHTML = this._arrData[this._arrSelectedIndexes[0]][this._field];
            }
        }else if(this._arrSelectedIndexes.length == this._itemList.length){
            this.title.innerHTML = "全选（"+this._arrSelectedIndexes.length+"项）";
        }else{
            this.title.innerHTML = "选中"+this._arrSelectedIndexes.length+"项";
        }
    };
    p.setData = function(arrData,field,arrSelectedIndexes)
    {
        this.clearList();
        this._arrData = arrData;
        this._field = field;
        this._arrSelectedIndexes = arrSelectedIndexes;
        if(this.mustHasOne && this._arrSelectedIndexes.length == 0){
            this._arrSelectedIndexes = [0];
        }
        this.createList();
        this.setTitle();
    };
    p.getDataCount = function()
    {
        return this._arrData.length;
    };
    p.getArrSelectedIndexes = function () {
        return this._arrSelectedIndexes;
    };
    p.isSelectedAll = function () {
        if(this._arrSelectedIndexes.length == 0){
            return false;
        }else if(this._arrSelectedIndexes.length == this._itemList.length){
            return true;
        }else{
            return false;
        }
    };
    p.isUnselectedAll = function(){
        return this._arrSelectedIndexes.length == 0;
    };
    p.getSelectedArrData = function () {
        var arr = [];
        for(var i=0;i<this._arrSelectedIndexes.length;i++){
            arr.push(this._arrData[this._arrSelectedIndexes[i]]);
        }
        return arr;
    };
    p.getArrTitle = function () {
        var arr = [];
        for(var i=0;i<this._arrSelectedIndexes.length;i++){
            if(this._field == ""){
                arr.push(this._arrData[this._arrSelectedIndexes[i]]);
            }else{
                arr.push(this._arrData[this._arrSelectedIndexes[i]][this._field]);
            }
        }
        return arr;
    };
    p.getArrByField = function (field) {
        var arr = [];
        for(var i=0;i<this._arrSelectedIndexes.length;i++){
            arr.push(this._arrData[this._arrSelectedIndexes[i]][field]);
        }
        return arr;
    };
    p.getStrTitle = function(sep){
        if(sep==null)sep=",";
        return this.getArrTitle().join(sep);
    };
    p.getStrByField = function(field,sep){
        if(sep==null)sep=",";
        return this.getArrByField(field).join(sep);
    };
    p.getArrData = function(){
        return this._arrData;
    };
     p.setVisibled = function(bl){
         this.visible = bl;
         this.containerDiv.hidden = !bl;
     };
    p.closeAlert = function(){
        if(this.alarmFlag != 0){
            clearInterval(this.alarmFlag);
            this.alarmFlag = 0;
        }
        this.title.style.borderColor = "";
    };
    p.showAlarm = function(){
        this.closeAlert();
        this.titleBorderAlpha = 1;
        this.title.style.borderColor = "rgba(255,0,0,"+this.titleBorderAlpha+")";
        this.alarmFlag = setInterval(Global.delegate(this.alarmAlphaDown,this),100);
    };
    p.alarmAlphaDown = function(){
        this.titleBorderAlpha -= 0.1;
        this.title.style.borderColor = "rgba(255,0,0,"+this.titleBorderAlpha+")";
        if(this.titleBorderAlpha<=0.2){
            clearInterval(this.alarmFlag);
            this.alarmFlag = setInterval(Global.delegate(this.alarmAlphaUp,this),100);
        }
    };
    p.alarmAlphaUp = function(){
        this.titleBorderAlpha += 0.1;
        this.title.style.borderColor = "rgba(255,0,0,"+this.titleBorderAlpha+")";
        if(this.titleBorderAlpha>=0.9){
            clearInterval(this.alarmFlag);
            this.alarmFlag = setInterval(Global.delegate(this.alarmAlphaDown,this),100);
        }
    };
     p.clearRes = function () {
         this.clearList();
         this.mainView.removeChild(this.containerDiv);
         this.containerDiv = null;
     };
    return DropDownListMultipleDiv;
})();
