/**
 * Created by wind on 2016/8/9.
 */

import args from './../../libs/createjs/createjs.js';
class ExpItem extends createjs.Container {
    constructor() {
        super();
        this.initView();
    }
    initView(){
        this.arrTxt = [];
        var t;
        for(var i=0;i<4;i++){
            t = new createjs.Text("aa","15px 微软雅黑","#ff00ff");
            this.arrTxt.push(t);
            this.addChild(t);
        }
    }
    setData(d){
        for(var i=0;i<this.arrTxt.length;i++){
            this.arrTxt[i].text = d["t"+i];
        }
    }

}

export default ExpItem;