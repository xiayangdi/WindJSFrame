import args from './libs/createjs/createjs.js';
import MenuItemText from './framework/com/MenuItemText.js';
import Menu from './framework/com/Menu.js';
//
createjs.MotionGuidePlugin.install(createjs.Tween);
createjs.Ticker.setFPS(60);
var mainCan = document.getElementById("mainCan");
mainCan.style.position = "absolute";
mainCan.width = 500;
mainCan.height = 500;

var stage = new createjs.Stage(mainCan);
stage.enableMouseOver(60);

var mi = [
  new MenuItemText("aaa",100,50,"#ff0000","#00ff00"),
  new MenuItemText("bbb",100,50,"#ff0000","#00ff00"),
  new MenuItemText("ccc",100,50,"#ff0000","#00ff00"),
  new MenuItemText("ddd",100,50,"#ff0000","#00ff00"),
  new MenuItemText("eee",100,50,"#ff0000","#00ff00"),
  new MenuItemText("fff",100,50,"#ff0000","#00ff00"),
  new MenuItemText("ggg",100,50,"#ff0000","#00ff00"),
  new MenuItemText("hhh",100,50,"#ff0000","#00ff00")];
var m = new Menu(mi,10,"v",3,"click",true,3000);
//constructor(arrItems, dis, dir, selectedIndex,trigger,blLoop,loopTime,boolMouseRelCon,arrRelationContainer) {
stage.addChild(m);

//arrItems, dis, dir, selectedIndex,trigger,blLoop,loopTime,boolMouseRelCon,arrRelationContainer) {
//var m = new Menu();

stage.addChild();



createjs.Ticker.addEventListener("tick",stage);
