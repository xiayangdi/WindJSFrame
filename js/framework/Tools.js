/**
 * Created by Thinkpad on 2016/8/5.
 */
'use strict';
function fun(){
    var width = window.innerWidth; //这里要加 window，因为 IE会无效
    var height = window.innerHeight;
    if (typeof width != 'number') { //如果是 IE，就使用 document
        if (document.compatMode == 'CSS1Compat') {
            width = document.documentElement.clientWidth;
            height = document.documentElement.clientHeight;
        } else {
            width = document.body.clientWidth; //非标准模式使用 body
            height = document.body.clientHeight;
        }
    }
}
