import args from './libs/createjs/createjs.js';
//import MenuItemText from './framework/com/MenuItemText.js';
//import Menu from './framework/com/Menu.js';
//import MenuTile from './framework/com/MenuTile.js';
import PageList from './framework/com/PageList.js';
//import TextString from './framework/com/TextString.js';
import ExpItem from './framework/com/ExpItem.js';

createjs.MotionGuidePlugin.install(createjs.Tween);
createjs.Ticker.setFPS(60);
var mainCan = document.getElementById("mainCan");
mainCan.style.position = "absolute";
mainCan.width = 500;
mainCan.height = 500;

var stage = new createjs.Stage(mainCan);
stage.enableMouseOver(60);

//var mi = [
//  new MenuItemText("aaa",40,50,"#ff0000","#00ff00"),
//  new MenuItemText("bbb",40,50,"#ff0000","#00ff00"),
//  new MenuItemText("ccc",40,50,"#ff0000","#00ff00"),
//  new MenuItemText("ddd",40,50,"#ff0000","#00ff00"),
//  new MenuItemText("eee",40,50,"#ff0000","#00ff00"),
//  new MenuItemText("fff",40,50,"#ff0000","#00ff00"),
//  new MenuItemText("ggg",40,50,"#ff0000","#00ff00"),
//  new MenuItemText("hhh",40,50,"#ff0000","#00ff00")];
////var m = new Menu(mi,5,"h",3,"click",true,3000);
//  var m = new MenuTile(mi,40,50,"v",4,5,5,3,"click",true,3000);//,boolMouseRelCon,arrRelationContainer);
//var i=0;
//m.addEventListener("MenuChangeEvent",()=>{console.log("menuChangeEvent"+(i++))});
//stage.addChild(m);


//var styleData = [{"valueField":"v","width":80,"height":10,"fontSize":"10px","font":"黑体","color":"#ff0000",}];
//constructor(pageW,pageH,listItemClass,listCount,listDir,listGap,pageGap,pageHGap,pageVGap,itemTriggle,pageTiggle) {
//var pl = new PageList(400,300);

//var txt1 = new createjs.Text("abc", "15px 微软雅黑", "#ff0000");
//var txt2 = new createjs.Text("abc", "15px 微软雅黑", "#ff0000");
//txt1.textAlign = "left";
//txt2.y = 30;
//txt2.textAlign = "left";
//txt2.lineWidth = 14;
//txt2.font = "30px 微软雅黑";
//stage.addChild(txt1,txt2);


//var s = {left:10,top:10,gapH:10,gapV:10,dir:"v",itemW:80,itemH:10,font:"30px 微软雅黑",color:"#ffff00",value:"a",
//  itemStyle:[
//    {valueField:"v1",width:80,height:10,font:"15px 微软雅黑",color:"#ff0000",value:"b"},
//    {valueField:"v2",width:80,height:10,font:"15px 微软雅黑",value:"c"},
//    {valueField:"v3"},
//    {valueField:"v4",width:80,height:10,color:"#ff0000",value:"d"},
//    {valueField:"v5",width:80,height:10,font:"15px 微软雅黑",color:"#ff0000"},
//    {valueField:"v6",font:"15px 微软雅黑",color:"#ff0000",value:"e"},
//    {valueField:"v7",font:"15px 微软雅黑",color:"#ff0000",value:"f"},
//    {valueField:"v8",width:80,height:10,font:"15px 微软雅黑",color:"#ff0000",value:"g"}
// ]};
//var s1 = {
//  itemStyle:[
//    {valueField:"v1"},
//    {valueField:"v2"},
//    {valueField:"v3"},
//    {valueField:"v4"},
//    {valueField:"v5"},
//    {valueField:"v6"},
//    {valueField:"v7"},
//    {valueField:"v8"}
//  ]};
//var ts = new TextString(s1);
//var d1 = {v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8};
//var d2 = {v1:11,v2:12,v3:13,v4:14,v5:15,v6:16,v7:17,v8:18};
//ts.setData(d1);
//stage.addChild(ts);

var p = new PageList(400,300,ExpItem,3,"v",10,5,5);
p.setData([{t0:0,t1:1,t2:2,t3:3},
  {t0:10,t1:11,t2:2,t3:3},
  {t0:20,t1:21,t2:2,t3:3},
  {t0:30,t1:31,t2:2,t3:3},
  {t0:40,t1:41,t2:2,t3:3},
  {t0:50,t1:51,t2:2,t3:3},
  {t0:60,t1:61,t2:2,t3:3},
  {t0:70,t1:71,t2:2,t3:3},
  {t0:80,t1:81,t2:2,t3:3},
  {t0:90,t1:91,t2:2,t3:3},
  {t0:110,t1:111,t2:2,t3:3},
  {t0:220,t1:221,t2:2,t3:3},
  {t0:330,t1:331,t2:2,t3:3},
  {t0:440,t1:441,t2:2,t3:3},
  {t0:550,t1:551,t2:2,t3:3},
  {t0:660,t1:661,t2:2,t3:3},
  {t0:770,t1:771,t2:2,t3:3}]);

stage.addChild(p);

createjs.Ticker.addEventListener("tick",stage);
