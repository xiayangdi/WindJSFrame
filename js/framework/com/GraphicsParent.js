/**
 * Created by Administrator on 2016/8/1 0001.
 */

    //画图的父类
class GraphicsParent extends createjs.Container
{

    constructor(){
        super();
    }

    init(){

    }

    //快速排序
    // var aaa = [3, 5, 2, 9, 1];
    // this.quickSort(aaa, 0, aaa.length - 1);
    quickSort(array, left, right) {
        if (Object.prototype.toString.call(array).slice(8, -1) === 'Array' && typeof left === 'number' && typeof right === 'number') {
            if (left < right) {
                var x = array[right], i = left - 1, temp;
                for (let j = left; j <= right; j++) {
                    if (array[j] <= x) {
                        i++;
                        temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                    }
                }
                this.quickSort(array, left, i - 1);
                this.quickSort(array, i + 1, right);
            }
        } else {
            return 'array is not an Array or left or right is not a number!';
        }
    }

    //取两轴的数值
    drawY(cormax,cormin,cornumber){
        let temp = 0;
        let extranumber = 0;
        let corstep = 0;
        let tmpstep = 0;
        let tmpnumber = 0;
        // console.log(cormax,cormin,cornumber,'---');
        if(cormax<=cormin)
            return null ;
        corstep=(cormax*1.1-cormin)/cornumber;
        if(Math.pow(10,parseInt(Math.log(corstep)/Math.log(10)))==corstep){
            temp = Math.pow(10,parseInt(Math.log(corstep)/Math.log(10)));
        }else{
            temp = Math.pow(10,(parseInt(Math.log(corstep)/Math.log(10))+1));
        }
        tmpstep = Number((corstep/temp).toFixed(6));
        //选取规范步长
        if(tmpstep>=0&&tmpstep<=0.1){
            tmpstep = 0.1;
        }else if(tmpstep>=0.100001&&tmpstep<=0.2){
            tmpstep = 0.2;
        }else if(tmpstep>=0.200001&&tmpstep<=0.25){
            tmpstep = 0.25;
        }else if(tmpstep>=0.250001&&tmpstep<=0.5){
            tmpstep = 0.5
        }else{
            tmpstep = 1;
        }
        tmpstep = tmpstep * temp;
        if(parseInt(cormin/tmpstep)!=(cormin/tmpstep)){
            if(cormin<0){
                cormin = (-1) * Math.ceil(Math.abs(cormin/tmpstep))*tmpstep;
            }else{
                cormin = parseInt(Math.abs(cormin/tmpstep))*tmpstep;
            }

        }
        if(parseInt(cormax/tmpstep)!=(cormax/tmpstep)){
            cormax = parseInt(cormax/tmpstep+1)*tmpstep;
        }
        tmpnumber = (cormax-cormin)/tmpstep;
        if(tmpnumber<cornumber){
            extranumber = cornumber - tmpnumber;
            tmpnumber = cornumber;
            if(extranumber%2 == 0){
                cormax = cormax + tmpstep*parseInt(extranumber/2);
            }else{
                cormax = cormax + tmpstep*parseInt(extranumber/2+1);
            }
            cormin = cormin - tmpstep*parseInt(extranumber/2);
        }
        cornumber = tmpnumber;

        let arrValue = [];
        let size = parseInt(cormax/cornumber);
        if(cormax <5) arrValue = [0,1,2,3,4,5];
        else{

            for(let i = 0;i<cornumber+1;i++){
                arrValue.push(i*size);
            }
        }

        return arrValue;
    }

    //取两轴的数值
    // drawY (arr1){
    //
    //     let max = this.getYMax(arr1);
    //     //console.log(max)
    //     let arr = [];
    //     let size = parseInt(max/5);
    //
    //     if(max <5) arr = [0,1,2,3,4,5];
    //     else{
    //
    //         for(let i = 0;i<6;i++){
    //             arr.push(i*size);
    //         }
    //     }
    //
    //     return arr;
    // }

    //取两轴的数值
    // getYMax (arr1){
    //
    //     let max = (parseInt(Math.max.apply(Math,arr1.slice()))).toString();
    //     let num = 0;
    //     let maxLength = max.length;
    //
    //     if(maxLength > 2){
    //
    //         num = Math.pow(10,maxLength-2);
    //         max = Math.ceil(parseFloat(max)/ (1.94 * num)) * 2 * num;
    //
    //         let checkAfterBol = (max/Math.pow(10,(max.toString().length)-2)<<1).toString().split(".").length>1?true:false;
    //         checkAfterBol&&(num = Math.pow(10,(max.toString().length)-2),max = Math.ceil(max/ (1.94 * num)) * 2 * num);
    //
    //     }
    //     else{
    //
    //         if(0<max&&max<10) max = 10;
    //         else if(max>10&&max<100){
    //             num = 10;
    //             max = (Math.ceil(max/ (1.98 * num)) << 1) * num;
    //         }
    //
    //     }
    //
    //     return max||0;
    //
    // }

    //取深颜色
    getDarkColor(color, level) {

        let rgbc = this.HexToRgb(color);
        //floor 向下取整
        for (let i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level));
        return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2]);
    }

    HexToRgb(str) {

        str = str.replace("#", "");
        //match得到查询数组
        let hxs = str.match(/../g);
        for (let i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16);
        return hxs;
    }

    //将rgb颜色值为a,b,c转化成hex颜色值
    RgbToHex(a, b, c) {
        let hexs = [a.toString(16), b.toString(16), c.toString(16)];
        for (let i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = "0" + hexs[i];
        return "#" + hexs.join("");
    }

    //矩形
    drawRect = function(w1,h1,color){

        let roundObject = new createjs.Shape();
        roundObject.graphics.beginFill(color);
        roundObject.graphics.drawRect(0,0,w1,h1);
        roundObject.graphics.endFill();

        return roundObject;
    }

    //画立体柱子
    drawCylinder(w1,h1,r,colorArr)
    {
        r = r||6;

        let roundObject = new createjs.Shape();

        let colors = colorArr||["#00FFFF","#0099FF"];
        let alphas = [1,1];
        let ratios = [0,0xFF];
        let color1 = "#" + colors[0].substr(1,1) + colors[0].substr(3,1) + colors[0].substr(5,1);
        let color2 = "#" + colors[1].substr(1,1) + colors[1].substr(3,1) + colors[1].substr(5,1);
        roundObject.graphics.beginLinearGradientFill([color1,color2], [0, 1], 0, 0, 0, h1);

        if(h1 > 0){

            roundObject.graphics.moveTo( 0,  0 + h1);
            roundObject.graphics.bezierCurveTo(0,h1 + 2 * r, w1,h1+ 2 * r, w1, h1);

            roundObject.graphics.lineTo( w1, 0);
            roundObject.graphics.bezierCurveTo(w1,2 * r,0,2 * r,0,0);

            roundObject.graphics.endFill();
        }


        roundObject.graphics.beginFill(this.getDarkColor(colors[1],0.1));
        roundObject.graphics.moveTo( 0, 0);
        roundObject.graphics.bezierCurveTo(0,-2 *r, w1,-2 * r, w1, 0);
        roundObject.graphics.bezierCurveTo(w1,2 *r,0,2 * r,0,0);
        roundObject.graphics.endFill();

        return roundObject;
    }


    //画圆
    drawCircle($x,$y,$radius,$color)
    {
        let $s = new createjs.Shape();
        $s.graphics.beginFill($color);
        $s.graphics.drawCircle(0,0,$radius);
        $s.graphics.endFill();
        $s.x = $x;
        $s.y = $y;
        return $s;
    }

    //画线
    drawLine($s,$dataArr,$lineColor,$thickness,$isFill,$fillColor)
    {
        let $lC = $lineColor||"#ffffff";
        let $tN = $thickness||2.5;
        let $iF = $isFill == 'undefined'?false:$isFill;
        let $fC = $fillColor||"#ffffff";
        if(!$s) return;
        $s.graphics.clear();
        $s.graphics.setStrokeStyle($tN);
        $s.graphics.beginStroke($lC);
        if($iF) $s.graphics.beginFill($fC);

        let len = $dataArr.length;
        let n = 0;

        for(let i =0;i<len;i++){
            if(!(i%2)){
                !n?$s.graphics.moveTo($dataArr[i],$dataArr[i+1]):$s.graphics.lineTo($dataArr[i],$dataArr[i+1]);
                n++;
            }
        }
        $s.graphics.endFill();
        return $s;
    }

    //克隆对象
    clone(obj){
        let o;
        switch(typeof obj){
            case 'undefined': break;
            case 'string'   : o = obj + '';break;
            case 'number'   : o = obj - 0;break;
            case 'boolean'  : o = obj;break;
            case 'object'   :
                if(obj === null){
                    o = null;
                }else{
                    if(obj instanceof Array){
                        o = [];
                        for(let i = 0, len = obj.length; i < len; i++){
                            o.push(this.clone(obj[i]));
                        }
                    }else{
                        o = {};
                        for(let k in obj){
                            o[k] = this.clone(obj[k]);
                        }
                    }
                }
                break;
            default:
                o = obj;break;
        }
        return o;
    }

    //文本
    getTxt(str,color,size,_x,_y,sL,$font){

        // 黑体：SimHei
        // 宋体：SimSun
        // 新宋体：NSimSun
        // 仿宋：FangSong
        // 楷体：KaiTi
        // 仿宋_GB2312：FangSong_GB2312
        // 楷体_GB2312：KaiTi_GB2312
        // 微软雅黑体：Microsoft YaHei

        color = color||"#ffffff";
        size = size||20;
        sL = sL||'';
        _x = _x||0;
        _y = _y||0;
        $font = $font;

        // console.log($font);
        let txt = new createjs.Text(str + '');
        txt.color = color;
        txt.font = size + "px " + $font;

        if(sL == "left"){
            txt.x = _x;
            txt.y = _y - txt.getMeasuredHeight()/2;
        }
        else if(sL == "right"){
            txt.x = _x - txt.getMeasuredWidth();
            txt.y = _y - txt.getMeasuredHeight()/2;
        }
        else if(sL == "bottom"){
            txt.x = _x - txt.getMeasuredWidth()/2;
            txt.y = _y;
        }
        else if(sL == "top"){
            txt.x = _x - txt.getMeasuredWidth()/2;
            txt.y = _y - txt.getMeasuredHeight();
        }
        else{
            txt.x = _x;
            txt.y = _y;
        }

        return txt;
    }


}

export default  GraphicsParent;