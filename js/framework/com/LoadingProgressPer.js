/**
 * Created by Thinkpad on 2015/12/31.
 */
import args from './../../libs/createjs/createjs.js';
class LoadingProgressPanel extends createjs.Container{
    constructor(panelW,panelH,prgW,prgH,panelBgColor,prgBgColor,prgColor){
        super();

        this._panelW = panelW ? panelW : 1024;
        this._panelH = panelH ? panelH : 768;
        this._prgW = prgW ? prgW : 500;
        this._prgH = prgH ? prgH : 20;
        this._panelBgColor = (panelBgColor != undefined && panelBgColor != null)?panelBgColor:"#050f2b";
        this._prgBgColor = (prgBgColor != undefined && prgBgColor != null)?prgBgColor:"#000000";
        this._prgColor = (prgColor != undefined && prgColor != null)?prgColor:"#ffffff";

        this._index = 0;
        this._count = 0;

        this._load = new createjs.LoadQueue(true);
        this._load.on("fileprogress",this.onhandleProgress);
        this._load.on("complete", this.onhandleComplete);
        this._load.on("fileload", this.onhandleFileLoader);

        this.createView();
    }
    createView(){
        this.panelShape = new createjs.Shape();
        this.panelShape.graphics.beginFill(this._panelBgColor);
        this.panelShape.graphics.drawRect(0,0,this._panelW,this._panelH);
        this.panelShape.graphics.endFill();
        this.addChild(this.panelShape);

        this.prgBgShape = new createjs.Shape();
        this.prgBgShape.x = (this._panelW - this._prgW)/2;
        this.prgBgShape.y = (this._panelH - this._prgH)/2;
        this.prgBgShape.graphics.beginFill(this._prgBgColor);
        this.prgBgShape.graphics.drawRect(0,0,this._prgW,this._prgH);
        this.prgBgShape.graphics.endFill();
        this.addChild(this.prgBgShape);

        this.prgShape = new createjs.Shape();
        this.prgShape.x = (this._panelW - this._prgW)/2;
        this.prgShape.y = (this._panelH - this._prgH)/2;
        this.addChild(this.prgShape);

        this.prgText = new createjs.Text("loading...0", "32px sans-serif", "#999");
        this.prgText.x = this._panelW/2;
        this.prgText.y = this._panelH/2 - this._prgH - 10;
        this.prgText.textAlign = "center";
        this.prgText.textBaseline = "middle";
        this.addChild(this.prgText);
    }

    loadFile(arrLoad,handleProgress,handleComplete,handleFileLoader) {
        this._index = 0;
        this._loadAllCount = arrLoad.length;
        this._handleProgress = handleProgress;
        this._handleComplete = handleComplete;
        this._handleFileLoader = handleFileLoader;

        this._load.loadManifest(arrLoad,true);
    }
    onhandleProgress = (event) => {
        //var loading = event.loaded;
        //var total = event.total;
        //console.log(loading,event.total);
        //if(loading==total)
        //{
        //}
    };
    onhandleComplete = (event) =>{
        //this._scene.dispatchEvent(new Event("loadOver"));
        //console.log("all loading complete")
        //alert("loadover");
        if(this._handleComplete)
        {
            this._handleComplete();
        }
    };
    onhandleFileLoader = (event) => {
        var w = ((this._index+1)/this._loadAllCount) *this._prgW;
        this.prgShape.graphics.clear();
        this.prgShape.graphics.beginFill(this._prgColor);
        this.prgShape.graphics.drawRect(0,0,w,this._prgH);
        this.prgShape.graphics.endFill();
        this.prgText.text = "loading..."+Math.round(((this._index+1)/this._loadAllCount)*100)+"%";
        this._index++;
        if(this._handleFileLoader)
        {
            this._handleFileLoader(event);
        }
    };
}

export default LoadingProgressPanel;