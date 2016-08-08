/**
 * Created by Thinkpad on 2016/1/23.
 */
var twing = twing ||{ui:{},com:{},charts:{}};
twing.com.DateTimer = (function () {
    function DateTimer()
    {
        this.init();
    }
    var p = DateTimer.prototype = new createjs.Container();
    p.Container_initialize = p.initialize;
    p.init = function()
    {
        this.Container_initialize();
        this.createView();
    };
    p.createView = function () {
        this.time_txt = new createjs.Text("13:45:12", "bold 42px 'Arial'", "#FFFFFF");
        this.time_txt.name = "time_txt";
        this.time_txt.lineHeight = 42;
        this.time_txt.lineWidth = 209;
        this.time_txt.setTransform(170,0);
        this.addChild(this.time_txt);
        this.date_txt = new createjs.Text("2015/9/18", "bold 32px 'Arial'", "#FFFFFF");
        this.date_txt.name = "date_txt";
        this.date_txt.lineHeight = 34;
        this.date_txt.lineWidth = 159;
        this.date_txt.setTransform(0,12);
        this.addChild(this.date_txt);
        this.checkTick();
    };

    p.checkTick = function()
    {
        var date = new Date();
        var str;
        if(date.getMinutes()<10){
            str = "0"+date.getMinutes();
        }else
        {
            str=date.getMinutes();
        }
        var str1 ;
        if(date.getSeconds()<10)
        {
            str1="0"+date.getSeconds();
        }else
        {
            str1 = date.getSeconds();
        }
        var str0;
        if(date.getHours()<10)
        {
            str0 ="0"+date.getHours();
        }else
        {
            str0 = date.getHours();
        }
        this.time_txt.text =str0+":"+str+":"+str1;
        this.date_txt.text = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
    };
    return DateTimer;
})();