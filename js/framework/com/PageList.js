/**
 * Created by wind on 2016/2/24.
 */
import args from './../libs/createjs/createjs.js';

class PageList extends createjs.Container{
    constructor(pageW,pageH,listItemClass,listCount,listDir,listGap,pageGap,pageHGap,pageVGap,itemTriggle,pageTiggle) {
        super();

        this._pageW = pageW!=null ? pageW:100;
        this._pageH = pageH!=null ? pageH:100;
        this._listItemClass = listItemClass;
        this._listCount = listCount!=null ? listCount:10;
        this._listDir = listDir == "v" ? "v" : "h";
        this._listGap = listGap!=null ? listGap:0;
        this._pageGap = pageGap!=null ? pageGap:0;
        this._pageHGap = pageHGap!=null ? pageHGap:10;
        this._pageVGap = pageVGap!=null ? pageVGap:10;
        this._itemTriggle = itemTriggle!=null ? itemTriggle:"mouseover";
        this._pageTiggle = pageTiggle!=null ? pageTiggle:"mouseover";

        this._allPage = 0;
        this._currentPage = 0;

        this._pageItemsPool = [];
        this._listItemsPool = [];

        this.arrData = [];
        this.initialize();
    };
    initialize() {
        this.listContainer = new createjs.Container();
        this.addChild(this.listContainer);
        this.listMenus = new twing.com.Menu([], this._listGap,this._listDir,0,this._itemTriggle);
        this.listContainer.addChild(this.listMenus);
        this.listMenus.addEventListener("MenuChangeEvent",Global.delegate(this.onListMenuChange,this));
        this.pageMenus = new twing.com.Menu([],this._pageGap,"h",0,this._pageTiggle);
        this.addChild(this.pageMenus);
        this.pageMenus.addEventListener("MenuChangeEvent",Global.delegate(this.onPageMenuChange,this));
        //this.createView();
    }
    createView() {
        this._allPage = Math.ceil(this.arrData.length/this._listCount);
        this.createPageMenus();
        this.createListMenus();
        this.pageMenus.visible = this._allPage>1;
    }
    createPageMenus() {
        this.createPageItem(this._allPage);
        var items = [];
        for(var i=0;i<this._allPage;i++)
        {
            items.push(this._pageItemsPool[i]);
        }
        this.pageMenus.resetItems(items);
        this.pageMenus.x = this._pageW - this.pageMenus.getWidth() - this._pageHGap;
        this.pageMenus.y = this._pageH - this.pageMenus.getHeight() - this._pageVGap;
    }
    createPageItem(c) {
        if(this._pageItemsPool.length<c)
        {
            var leg = this._pageItemsPool.length;
            var cc = c-leg;
            var s;
            for(var i=0;i<cc;i++)
            {
                s = leg + i + 1;
                this._pageItemsPool.push(new twing.com.MenuItemText(s,15,21));
            }
        }
    }
    createListMenus() {
        var leftC = this.arrData.length - this._currentPage * this._listCount;
        var ct = leftC>this._listCount?this._listCount:leftC;
        this.createListItem(ct);
        var items = [];
        for(var i=0;i<ct;i++)
        {
            items.push(this._listItemsPool[i]);
            this._listItemsPool[i].setData(this.arrData[this._currentPage * this._listCount + i],i+1);
        }
        this.listMenus.resetItems(items);
    }
    createListItem(c) {
        if(this._listItemsPool.length<c)
        {
            var leg = this._listItemsPool.length;
            var cc = c-leg;
            var s;
            for(var i=0;i<cc;i++)
            {
                this._listItemsPool.push(new this._listItemClass());
            }
        }
    }
    onPageMenuChange(event){
        this._currentPage = this.pageMenus.getSelectedIndex();
        this.createListMenus();
        if(Tools.browserType()==CONST.BROWER_IE)
        {
            this.dispatchEvent("ListIndexChangeEvent");
        }else{
            this.dispatchEvent(new Event("ListIndexChangeEvent"));
        }
    }
    onListMenuChange(event){
        if(Tools.browserType()==CONST.BROWER_IE)
        {
            this.dispatchEvent("ListIndexChangeEvent");
        }else{
            this.dispatchEvent(new Event("ListIndexChangeEvent"));
        }
    }
    getSelectedIndex() {
        return this._currentPage*this._listCount+this.listMenus.getSelectedIndex();
    }
    getSelectedItemData () {
        return this.arrData[this.getSelectedIndex()];
    }
    getSelectedItem(){
        return this.listMenus.getSelectedItem();
    }
    clear() {
        this.arrData = [];
        this._allPage = 0;
        this._currentPage = 0;

        this.pageMenus.resetItems([]);
    }
    setData(arrData)
    {
        this.clear();
        this.arrData = arrData;
        this.createView();
    }
}
export default PageList;
