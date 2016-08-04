var webpack = require('webpack');

module.exports = {
	//页面入口文件配置
    entry: "./js/main.js",
    //输出配置
    output: {
    		path:'./build',
        filename: 'index.js'
    },
    module: {
    		//加载器配置
        loaders: [
        		{test:/\.js?$/,loaders:['react-hot','babel'],exclude:/node_modules/},
            {test:/\.js$/,loader:'babel-loader',exclude:/node_modules/,query: {presets:[ 'es2015', 'react', 'stage-0' ]}},
            { test: /\.css$/, loader: "style-loader!css-loader" },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    }
    //其他解决方案配置
//  resolve: {
//      root: [
//      		path.resolve(__dirname, 'src'),
//      		path.resolve(__dirname, 'vendors'),
//      ],
//		//自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
//      extensions: ['', '.js', '.json', '.scss'],
//		//模块别名定义，方便后续直接引用别名，无须多写长长的地址
//      alias: {
//      		'AppStore' : 'js/stores/AppStores.js',
//      		'ActionType' : 'js/actions/ActionType.js',
//      		'AppAction' : 'js/actions/AppAction.js',//后续直接 require('AppStore') 即可
//        	'TweenLite': 'gsap/src/minified/TweenLite.min.js'
//      }
//  },
//  devtool: 'source-map'
};
