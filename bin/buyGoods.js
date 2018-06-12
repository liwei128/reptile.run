var fs = require('fs');
var content = fs.read(fs.workingDirectory+'/config/mi.json');
var data = JSON.parse(content);
var index = 0;
  
var settings = {
  operation: "GET",
  encoding: "utf-8",
  headers: {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.170 Safari/537.36"
  }
}; 

function setCookies(){
    var jsonList = data.user.cookies;
    jsonList.forEach(function(cook){  
        cook.expires = (new Date()).getTime() + (1000 * 60 * 60 );
        phantom.addCookie(cook);
    });
    phantom.cookiesEnabled = true;
}

setTimeout(function () {
        phantom.exit();
    }, 10000);

var  page = require('webpage').create(); 
page.settings.loadImages = false;
page.settings.resourceTimeout = 8000;

page.onAlert = function(test){
    console.log(test);
}
function start(goodsUrl,select){

    setCookies();
    buyGoods(goodsUrl,select);
}

function buyGoods(goodsUrl,select){
	var s= new Date().getTime();
    page.open(goodsUrl,settings,function (status) { 
        setTimeout(function(){
             page.injectJs("./zepto.min.js",function(){
             });
			//选择版本颜色保障服务等	
			for (var i=0;i<select.length;i++){
				setTimeout(function(){
					page.evaluate(function(i,j){
						$(".list-wrap#J_list >div").eq(i).children("ul").children("li").eq(j).click(); 
					},index,select[index]);
					index++;
				},600*i);
			}
            //提交购物车
            setTimeout(function(){
                setCookies();
                page.evaluate(function(){
		     $("#J_buyBtnBox>li>a").click();
                }); 
				console.log("success");
            },600*select.length) ;
			//退出
			setTimeout(function(){
               phantom.exit();
            },600*(select.length+1)) ;
        },600);
		
    });
}
start(data.goodsInfo.url,data.goodsInfo.params_index);




