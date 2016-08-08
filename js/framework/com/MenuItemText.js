/**
 * Created by wind on 2016/1/20.
 *
 *
 *
 *
 */
import args from './../../libs/createjs/createjs.js';
class MenuItemText extends createjs.Container{
    /**
     *
     * @param {string} txt
     * @param {number} w
     * @param {number} h
     * @param selectedColor
     * @param unselectedColor
     */
    constructor(txt,w,h,selectedColor,unselectedColor){
        super();

        this._txt = txt;
        this._w = w;
        this._h = h;
        this._selected = false;

        this._selectedColor = selectedColor==null?"#FFFFFF":selectedColor;
        this._unselectedColor = unselectedColor==null?"#6b6b6b":unselectedColor;

        this.createView();
    }
    createView() {
        this.width = this._w;
        this.height = this._h;
        this.eventShape = new createjs.Shape();//只有文字的话，点在文字的空隙处无法触发，所以加shape
        this.eventShape.graphics.beginFill("#ff0000").drawRect(0, 0, this.width, this.height);
        this.eventShape.alpha = 0.01;
        this.addChild(this.eventShape);
        this.title = new createjs.Text(this._txt, "15px 微软雅黑", "#ffffff");
        this.title.x = 0;
        this.title.y = 0;
        this.addChild(this.title);

        this.selected = false;
    }
    setText(txt) {
        this.title.text = txt;
        this.width = this.title.getMeasuredWidth();
        this.height = this.title.getMeasuredHeight();
        this.eventShape.graphics.clear();
        this.eventShape.graphics.beginFill("#ff0000").drawRect(0, 0, this.width, this.height);
        this.eventShape.graphics.endFill();
    }
    setData(d,propName){
        if(propName==null){
           if(typeof d === "string"){
                this.setText(d);
           }else{
               this.setText("");
               console.error("MenuItemText.setData :  Illegal Data");
           }
        }else{
            this.setText(d[propName]);
        }
    }
    set selected(bl){
        this._selected = bl===true;
        this.title.color = this._selected?this._selectedColor:this._unselectedColor;
    }
    get selected(){
        return this._selected;
    }
}

export default MenuItemText;