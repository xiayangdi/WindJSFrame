/**
 * Created by wind on 2016/8/9.
 */
import Tools from '../utils/Tools.js';
import args from './../../libs/createjs/createjs.js';
class TextString extends createjs.Container{
    constructor(styleData){
        super();
        this.setDefaultData();
        this.setStyleData(styleData==null?{}:styleData);
        this.initView();
    }
    setDefaultData(){
        this._left = 10;
        this._top = 10;
        this._gapH = 10;
        this._gapV = 10;
        this._dir = "h";
        this._itemW = 80;
        this._itemH = 10;
        this._font = "15px 微软雅黑";
        this._color = "#000000";
        this._textAlign = "left";
        this._value = "";
        this._itemStyle = [];

        this.__arrText = [];
    }
    setStyleData(styleData){
        for(let k in styleData){
            this["_"+k] = styleData[k];
        }
    }
    initView(){
        var txt;
        for(let i=0;i<this._itemStyle.length;i++){
            txt = new createjs.Text("");txt.
            this.__arrText.push(txt);
            this.setTextStyleByIdx(i);
            this.addChild(txt);
        }
        this.setTextPos();
    }
    setTextStyleByIdx(idx){
        if(idx>=this._itemStyle.length){
            return;
        }

        var f,c,v,al;
        var st = this._itemStyle[idx];
        if(Tools.hasProperty(st,"font")){
            f = st.font;
        }else{
            f = this._font;
        }
        if(Tools.hasProperty(st,"color")){
            c = st.color;
        }else{
            c = this._color;
        }
        if(Tools.hasProperty(st,"value")){
            v = st.value;
        }else{
            v = this._value;
        }
        if(Tools.hasProperty(st,"textAlign")){
            al = st.textAlign;
        }else{
            al = this._textAlign;
        }
        this.__arrText[idx].font = f;
        this.__arrText[idx].color = c;
        this.__arrText[idx].text = v;
        this.__arrText[idx].textAlign = al;
    }
    setTextPos(){
        var i=0;
        if(this._dir == "v"){
            var h = 0;
            for(i=0;i<this.__arrText.length;i++){
                this.__arrText[i].x = this._left;
                if(Tools.hasProperty(this._itemStyle[i],"height")){
                    h = this._itemStyle[i].height;
                }else{
                    h = this._itemH;
                }
                this.__arrText[i].y = this._top + (this._gapV+h)*i;
            }
        }else{
            var w = 0;
            for(i=0;i<this.__arrText.length;i++){
                this.__arrText[i].y = this._top;
                if(Tools.hasProperty(this._itemStyle[i],"width")){
                    w = this._itemStyle[i].width;
                }else{
                    w = this._itemW;
                }
                this.__arrText[i].x = this._left + (this._gapH+w)*i;
            }
        }
    }
    setData(data){
        for(var i=0;i<this._itemStyle.length;i++){
            if(Tools.hasProperty(data,this._itemStyle[i].valueField)){
                this._itemStyle[i].value = data[this._itemStyle[i].valueField];
                this.__arrText[i].text = this._itemStyle[i].value;
            }
        }
    }
}

export default TextString;