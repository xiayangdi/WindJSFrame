/**
 * Created by Thinkpad on 2016/3/17.
 */
var twing = twing ||{ui:{},com:{},charts:{}};
twing.com.SearchBtn = (function () {
    function SearchBtn() {
        this._flag = 0;
        this.timeLast = 500;
        this.initialize();
    }
    var p = SearchBtn.prototype = new createjs.Container();
    p.Container_initialize = p.initialize;
    p.initialize = function () {
        this.Container_initialize();
        this.createView();
    };
    p.createView = function () {
        this.search = ImageManager.singleton.getBitmapByID("id_btnSearch");
        this.searching = ImageManager.singleton.getBitmapByID("id_btnSearching");
        this.searched = ImageManager.singleton.getBitmapByID("id_btnSearch");

        this.addChild(this.search,this.searching,this.searched);
        this.setState(0);
    };
    p.setState = function(flag){
        this._flag = flag;
        this.search.visible = this._flag==0;
        this.searching.visible = this._flag==1;
        this.searched.visible = this._flag==2;
        this.setSearchingMovie(this._flag == 1);
    };
    p.getState = function () {
        return this._flag;
    };
    p.setSearchingMovie = function(bl){
        if(bl){
            createjs.Tween.get(this.searching).to({alpha:0.5},this.timeLast).call(Global.delegate(tweenOf,this));
            function tweenOf()
            {
                createjs.Tween.get(this.searching).to({alpha:1},this.timeLast).call(Global.delegate(tweenOn,this));
            }
            function tweenOn()
            {
                createjs.Tween.get(this.searching).to({alpha:0.5},this.timeLast).call(Global.delegate(tweenOf,this));
            }
        }else{
            createjs.Tween.removeTweens(this.searching);
            this.searching.alpha = 1;
        }
    };
    return SearchBtn;
})();