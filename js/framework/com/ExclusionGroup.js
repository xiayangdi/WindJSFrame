/**
 * Created by Thinkpad on 2016/5/26.
 */

var twing = twing ||{ui:{},com:{},charts:{}};
twing.com.ExclusionGroup = (function(){
    function ExclusionGroup(arrView,triggle,idx,triggleFun) {
        this._arrView = arrView==null?[]:arrView;
        this._triggle = triggle==null?"click":triggle;
        this._idx = idx==null?0:idx;
        this._triggleFun = triggleFun;
        this.initialize();
    };
    var p = ExclusionGroup.prototype = new Object();
    p.initialize = function(){
        for(var i=0;i<this._arrView.length;i++){
            this._arrView[i].addEventListener(this._triggle,Global.delegate(this.onChoose,this));
        }
        this.setState();
    };
    p.setState = function(){
        for(var i=0;i<this._arrView.length;i++){
            if(i==this._idx){
                this._arrView[i].setSelected(true);
            }else{
                this._arrView[i].setSelected(false);
            }
        }
    };
    p.onChoose = function(e){
        var o = e.currentTarget;
        var idx = this._arrView.indexOf(o);
        if(idx != -1){
            var bl = idx != this._idx;
            this._idx = idx;
            this.setState();
            if(bl){
                if(this._triggleFun != null){
                    this._triggleFun(e);
                }
            }
        }
    };
    p.setTriggleFun = function(f){
        this._triggleFun = f;
    };
    p.getSelectedIndex = function(){
        return this._idx;
    };
    p.setSelectedIndex = function(idx){
            this._idx = idx;
            this.setState();
    };
    p.addItem = function(o){
        var idx = this._arrView.indexOf(o);
        if(idx == -1){
            this._arrView.push(o);
            o.addEventListener(this._triggle,Global.delegate(this.onChoose,this));
        }
        this.setState();
    };
    p.addArrItem = function(arr){
        for(var i=0;i<arr.length;i++){
            this.addItem(arr[i]);
        }
    };
    return ExclusionGroup;
})();
