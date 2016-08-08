/**
 * Created by wind on 2016/8/5.
 */

import CONST from "./CONST.js";
class Tools{
    static clientWidth(){
        var width = window.innerWidth; //这里要加 window，因为 IE会无效
        if (typeof width != 'number') { //如果是 IE，就使用 document
            if (document.compatMode == 'CSS1Compat') {
                width = document.documentElement.clientWidth;
            }else{
                width = document.body.clientWidth; //非标准模式使用 body
            }
        }
        return width;
    }
    static clientHeight(){
        var height = window.innerHeight; //这里要加 window，因为 IE会无效
        if (typeof height != 'number') { //如果是 IE，就使用 document
            if (document.compatMode == 'CSS1Compat') {
                height = document.documentElement.clientHeight;
            }else{
                height = document.body.clientHeight; //非标准模式使用 body
            }
        }
        return height;
    }

    //判断浏览器版本

    static browserType (){
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
            return CONST.BROWER_OPERA;
        }else //判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            return CONST.BROWER_FIREFOX;
        }else //判断是否Firefox浏览器
        if (userAgent.indexOf("Chrome") > -1){
            return CONST.BROWER_CHROME;
        }else
        if (userAgent.indexOf("Safari") > -1) {
            return CONST.BROWER_SAFARI;
        } //判断是否Safari浏览器
        //if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        else{
            return CONST.BROWER_IE;
        } //判断是否IE浏览器
    }
}

export default Tools;