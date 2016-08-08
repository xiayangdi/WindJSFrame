/**
 * Created by Thinkpad on 2016/3/7.
 */
var payReset = payReset || {ui:{},com:{},charts:{}};
payReset.ui.PayResetBusDetail = (function(){
    PayResetBusDetail = function(posObj)
    {
        this.init(posObj);
    };

    var p = PayResetBusDetail.prototype = new createjs.Container();
    p.Container_initialize = p.initialize;
    p.init = function(posObj)
    {
        this.Container_initialize();
        this._checkTick = 0;
        this.curProvID = 0;
        this.curStartTime = "";
        this.curEndTime = "";

        this.title = ImageManager.singleton.getBitmapByID("id_PayResetBusDetail");
        this.addChild(this.title);

        this.mainView = document.getElementById("mainView");
        var pos = 38;
        //地市列表
        this.cityList = new twing.com.DropDownListDiv((posObj.x+7)+"px",(posObj.y+42+pos)+"px","222px","34px",this.mainView,null,"dropdownPayReset");
        this.cityList.x = 7;this.cityList.y = 42+pos;
        this.addChild(this.cityList);
        //this.cityList.addEventListener("SelectedChangeEvent",Global.delegate(this.onProvSelectedChangeEvent,this));
        this.cityListData = DataMap.getSingleProvArrDataByProvCode(MainPay.singleton.provID);
        this.cityListData.unshift({cityCode:"",cityName:"地市",provCode:MainPay.singleton.provID,provName:MainPay.singleton.provName});
        this.cityList.setData(this.cityListData,"cityName");

        //网元列表
        this.netList = new twing.com.DropDownListDiv((posObj.x+237)+"px",(posObj.y+42+pos)+"px","222px","34px",this.mainView,null,"dropdownPayReset");
        this.netList.x = 237;this.netList.y = 42+pos;
        this.addChild(this.netList);
        //this.netList.addEventListener("SelectedChangeEvent",Global.delegate(this.onProvSelectedChangeEvent,this));
        this.netListData = [];
        //this.netList.setData(this.netListData,"cityName");

        //端到端列表
        this.ETEList = new twing.com.DropDownListDiv((posObj.x+467)+"px",(posObj.y+42+pos)+"px","222px","34px",this.mainView,null,"dropdownPayReset");
        this.ETEList.x = 467;this.ETEList.y = 42+pos;
        this.addChild(this.ETEList);
        //this.ETEList.addEventListener("SelectedChangeEvent",Global.delegate(this.onProvSelectedChangeEvent,this));
        this.ETEListData = [
            {name:"环节",code:""},
            {name:"端到端",code:"MA1_ALL_TIME_REPLY"},
            {name:"缴费到账",code:"MX1_SUBLINK1_TIME_REPLY"},
            {name:"信用控制",code:"MX1_SUBLINK2_TIME_REPLY"},
            {name:"营业接口",code:"MX1_SUBLINK3_TIME_REPLY"},
            {name:"开通订单",code:"MX1_SUBLINK4_TIME_REPLY"},
            {name:"开通工单",code:"MX1_SUBLINK5_TIME_REPLY"},
            {name:"指令执行",code:"MX1_SUBLINK6_TIME_REPLY"}];
        this.ETEList.setData(this.ETEListData,"name");

        //性能列表
        this.avaList = new twing.com.DropDownListDiv((posObj.x+697)+"px",(posObj.y+42+pos)+"px","222px","34px",this.mainView,null,"dropdownPayReset");
        this.avaList.x = 697;this.avaList.y = 42+pos;
        this.addChild(this.avaList);
        //this.avaList.addEventListener("SelectedChangeEvent",Global.delegate(this.onProvSelectedChangeEvent,this));
        this.avaListData = [{name:"性能",code:""},{name:"小于20S",code:"20S"},{name:"20-30S",code:"30S"},{name:"30-60S",code:"60S"},{name:"1-5min",code:"5min"},{name:"5-10min",code:"10min"},{name:"10min及以上",code:"10minPlus"}];
        this.avaList.setData(this.avaListData,"name");

        var pos = -41;
        //开始时间
        var date = new Date();date.setMonth(date.getMonth()-1);
        this.startTimeList = new twing.com.TimeList("startTime3",(posObj.x+8)+"px",(posObj.y+83+pos)+"px","247px","30px",this.mainView);
        this.startTimeList.x = 8;this.startTimeList.y = 83+pos;
        this.startTimeList.setTime(date);
        this.addChild(this.startTimeList);
        //结束时间
        this.endTimeList = new twing.com.TimeList("endTime3",(posObj.x+286)+"px",(posObj.y+83+pos)+"px","247px","30px",this.mainView);
        this.endTimeList.x = 286;this.endTimeList.y = 83+pos;
        date.setMonth(date.getMonth()+1);
        this.endTimeList.setTime(date);
        this.addChild(this.endTimeList);
        //搜索
        this.btnSearch = new twing.com.SearchBtn();//ImageManager.singleton.getBitmapByID("id_btnSearch");
        this.btnSearch.cursor="pointer";
        this.btnSearch.x = 550;this.btnSearch.y = 75+pos;
        this.addChild(this.btnSearch);
        this.btnSearch.addEventListener("click",Global.delegate(this.onSearchEvent,this));
        //电话背景
        this.mobilBg = ImageManager.singleton.getBitmapByID("id_mobilBg");
        this.mobilBg.x = 428+176;this.mobilBg.y = 74+pos;
        this.addChild(this.mobilBg);
        //电话输入框
        this.mainView = document.getElementById("mainView");
        this.divMobil =  this.div = Tools.DDiv({left:(posObj.x+436+176)+"px",top:(posObj.y+82+pos)+"px",width:"164px",height:"37px"});
        this.txtMobil = document.createElement("input");
        this.txtMobil.type="text";
        //this.txtMobil.x = 1600+542;
        //this.txtMobil.y = 714+82;
        this.txtMobil.value = "";
        this.txtMobil.style.fontSize = "20px";
        this.txtMobil.style.fontFamily = "黑体";
        this.txtMobil.style.color = "#ffffff";
        this.txtMobil.style.backgroundColor="rgba(0,0,0,0)";
        this.txtMobil.style.textAlign = "center";
        this.txtMobil.style.width = "227px";
        this.txtMobil.style.height = "32px";
        //this.txtMobil.style.borderWidth = "0px";
        this.mainView.appendChild(this.divMobil);
        this.divMobil.appendChild(this.txtMobil);

        //this.txtMobil = new createjs.Text("","20px '黑体'","#ffffff");
        //this.txtMobil.x = 542;this.txtMobil.y = 82;
        //this.addChild(this.txtMobil);
        //查询按钮背景
        this.mobilSearchCon = new createjs.Container();
        this.mobilSearchCon.x = 658+176;this.mobilSearchCon.y = 75+pos;
        this.addChild(this.mobilSearchCon);
        this.btnMobilSearch = ImageManager.singleton.getBitmapByID("id_btnMobilSearch");
        this.mobilSearchCon.addChild(this.btnMobilSearch);
        //查询按钮
        this.txtSearch = new createjs.Text("查询","20px '黑体'","#ffffff");
        this.txtSearch.x = 38;this.txtSearch.y = 6;this.txtSearch.textAlign="center";
        this.mobilSearchCon.addChild(this.txtSearch);
        this.mobilSearchCon.cursor="pointer";
        this.mobilSearchCon.addEventListener("click",Global.delegate(this.onMobilSearch,this));

        this.detailCon = new createjs.Container();
        this.detailCon.x = 0;this.detailCon.y = 114;
        this.addChild(this.detailCon);

        this.itemsPool = [];
        this.createDetailTitle();
        this.itemContainer = new createjs.Container();
        this.itemArr = [];
        this.scroll = new twing.com.Scroll(this.itemContainer,{x:-10,y:0,width:911,height:19*8},8,"v");
        this.scroll.x = 0;
        this.scroll.y = 35;
        this.detailCon.addChild(this.scroll);


        //var o = {endToEnd:"628",
        //    paySheet:"20131128101514A5094118058",
        //    userNumber:"13866666666",
        //    channel:"缴费卡",
        //    mobileBelong:"武汉",
        //    way:"充值",
        //    time:"2015/1211 10:04",
        //    net:"7719",
        //    deal:"1",
        //    crm:"0",
        //    openDeal:"620",
        //    hlrDeal:"3"};
        //this.updateData({values:[o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o]});
    };
    p.createItem = function(c)
    {
        if(this.itemsPool.length<c)
        {
            var cc = c-this.itemsPool.length;
            for(var i=0;i<cc;i++)
            {
                this.itemsPool.push(new MenuItems.DetailItem());
            }
        }
    };

    p.createDetailTitle = function(){
        var bit = ImageManager.singleton.getBitmapByID("id_detailBg");
        this.detailCon.addChild(bit);

        //var arrTxtTitle = ["端到端","缴费流水","用户号码","渠道","归属地","缴费方式","缴费时间点","受理网元","账务处理","调用CRM","开通处理","HLR处理"];
        //var arrTxtTitlePos = [28,124-20,234-40,290-40+5,330-40+10,385-40,459-40+10,528,583,637,693,747];
        var arrTxtTitle = ["端到端","用户号码","渠道","归属地","缴费方式","缴费时间点","受理网元","账务处理","调用CRM","开通处理","HLR处理"];
        var arrTxtTitlePos = [28,106,189,256,323,429,550,627,703,781,857];
        var txtTitle;
        for(var i=0;i<12;i++){
            txtTitle = new createjs.Text(arrTxtTitle[i],"13px '黑体'","#ffffff");
            txtTitle.textAlign="center";
            txtTitle.x = arrTxtTitlePos[i];
            txtTitle.y = 8;
            this.detailCon.addChild(txtTitle);
        }
        var lineSp = new createjs.Shape();
        //lineSp.graphics.setStrokeStyle(0.5);
        //lineSp.graphics.beginStroke("#ffffff");
        //lineSp.graphics.moveTo(15,81);
        //lineSp.graphics.lineTo(890,81);
        //lineSp.graphics.endFill();
    };
    p.clearItem = function()
    {
        this.itemContainer.removeAllChildren();
        this.itemArr = [];
    };
    p.doNetListData = function(arrData){
        var arr = [];
        for(var i=0;i<arrData.length;i++){
            arr.push({name:arrData[i],code:arrData[i]});
        }
        return arr;
    };
    p.updateDataForNet = function(data){
        this.netListData = this.doNetListData(data)
        this.netListData.unshift({name:"网元",code:""});
        this.netList.setData(this.netListData,"name");
        RunDataManagerPer.singleton.getPayResetBusDetailData(
            MainPay.singleton.provID,
            this.cityList.getSelectedData().cityCode,
            this.curStartTime,this.curEndTime,
            this.netList.getSelectedData().code,
            this.ETEList.getSelectedData().code,
            this.avaList.getSelectedData().code
        );
    };
    p.resetCity = function(){
        this.cityListData = DataMap.getSingleProvArrDataByProvCode(MainPay.singleton.provID);
        this.cityListData.unshift({cityCode:"",cityName:"地市",provCode:MainPay.singleton.provID,provName:MainPay.singleton.provName});
        this.cityList.setData(this.cityListData,"cityName");
    };
    p.getData = function()
    {
        this._checkTick = 0;
        if(this.curProvID != MainPay.singleton.provID || this.curStartTime!=this.startTimeList.getStringTime() || this.curEndTime!= this.endTimeList.getStringTime()){
            this.curProvID = MainPay.singleton.provID;

            this.curStartTime = this.startTimeList.getStringTime();
            this.curEndTime = this.endTimeList.getStringTime();
            RunDataManagerPer.singleton.getPayResetNetListData(this.curProvID, this.curStartTime,this.curEndTime);
        }else{
            RunDataManagerPer.singleton.getPayResetBusDetailData(
                MainPay.singleton.provID,
                this.cityList.getSelectedData().cityCode,
                this.curStartTime,this.curEndTime,
                this.netList.getSelectedData().code,
                this.ETEList.getSelectedData().code,
                this.avaList.getSelectedData().code
            );
        }
    };
    p.updateData = function(data)
    {
        MainPay.singleton.onSearchEvent1OK(this);
        this.btnSearch.setState(0);
        this.clearItem();
        this._data = data;
        if(this._data==null)return;
        this.createItem(this._data.values.length);
        this.itemArr = [];
        for(var i=0;i<this._data.values.length;i++)
        {
            this.itemsPool[i].setData(this._data.values[i]);
            this.itemsPool[i].y = 19*i;
            this.itemArr.push(this.itemsPool[i]);
            this.itemContainer.addChild(this.itemsPool[i]);
        }
        this.itemContainer.y = 0;
        this.scroll.refresh();
    };
    p.checkTick = function()
    {
        this._checkTick++;
        if(this._checkTick>60)
        {
            this.getData();
        }
    };
    p.onSearchEvent = function(){
        if(this.btnSearch.getState()==0){
            this.btnSearch.setState(1);
            RunDataManagerPer.singleton.getPayResetBusDetailData(
                MainPay.singleton.provID,
                this.cityList.getSelectedData().cityCode,
                this.curStartTime,this.curEndTime,
                this.netList.getSelectedData().code,
                this.ETEList.getSelectedData().code,
                this.avaList.getSelectedData().code
            );
        }
    };
    p.onMobilSearch = function(){
        if(this.txtMobil.text == ""){
            this.updateData(this._data);
        }else{
            var arr = [];
            var s = this.txtMobil.value;
            var len = s.length;
            for(var i=0;i<this._data.values.length;i++){
                if(this._data.values[i].userNumber.substr(0,len) == s){
                    arr.push(this._data.values[i]);
                }
            }

            this.clearItem();
            this.itemArr = [];
            for(var i=0;i<arr.length;i++)
            {
                this.itemsPool[i].setData(arr[i]);
                this.itemsPool[i].y = 19*i;
                this.itemArr.push(this.itemsPool[i]);
                this.itemContainer.addChild(this.itemsPool[i]);
            }
            this.itemContainer.y = 0;
            this.scroll.refresh();
        }
    };
    p.doData = function(data)
    {

    };
    p.clearData = function()
    {

    };
    return PayResetBusDetail;
})();
