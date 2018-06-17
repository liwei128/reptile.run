system = require('system');
var url = system.args[1];//获得命令行第二个参数 接下来会用到     



setTimeout(function () {
        phantom.exit();
    }, 12000);

var  page = require('webpage').create(); 
page.settings.loadImages = false;
page.settings.resourceTimeout = 8000;

page.onAlert = function(test){
    console.log(test);
}
page.onResourceRequested = function(requestData,networkRequest){
	if(requestData.url.indexOf("https://order.mi.com/product/getExtendInfo")==0){
		console.log(requestData.url);
		phantom.exit(); 
	};
	
}

function buyGoods(goodsUrl){
    page.open(goodsUrl,function (status) { 
        
    });
}
buyGoods(url);




