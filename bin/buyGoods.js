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
 

function buyGoods(goodsUrl){
    page.open(goodsUrl,function (status) { 
        setTimeout(function(){
             page.injectJs("./zepto.min.js",function(){
             });
			var goodsInfos = {
				"name":"",
				"goodsIds":[],
				"version":[],
				"colors":[]
			};
			 var versionLength = page.evaluate(function(){
				 return $("ul.step-list.step-one.clearfix>li").length;
			 });
			 
			for(var i = 0;i<versionLength;i++){
				var goodsInfo = page.evaluate(function(index){
					var version = $("ul.step-one>li").eq(index).attr('data-value');
					var goodsIds = [];
					$("ul.step-one>li").eq(index).click();
					$("ul.step-list.clearfix:not(.step-one)>li").each(function(){
						var dataId = $(this).attr('data-id');
						if(dataId){
							goodsIds[goodsIds.length] = dataId;
						}else{
							goodsIds[goodsIds.length] = "empty";
						}
					});
					var goodsInfo = {
						"goodsIds":goodsIds,
						"version":version
					}
					return goodsInfo;
				},i);
				goodsInfos.version[goodsInfos.version.length] = goodsInfo.version;
				for(var j =0 ;j<goodsInfo.goodsIds.length;j++){
					goodsInfos.goodsIds[goodsInfos.goodsIds.length] = goodsInfo.goodsIds[j];
				}
			}
			var goodsColor = page.evaluate(function(){
				var name = $("h1.pro-title.J_proName").html();
				var goodsIds = [];
				var colors = [];
				$("ul.step-list.clearfix:not(.step-one)>li").each(function(){
					colors[colors.length] = $(this).attr('data-value');
					var dataId = $(this).attr('data-id');
					if(dataId){
						goodsIds[goodsIds.length] = dataId;
					}else{
						goodsIds[goodsIds.length] = "empty";
					}
				});
				var goodsColor = {
					"name":name,
					"goodsIds":goodsIds,
					"colors":colors
				}
				return goodsColor;
			});
			goodsInfos.name = goodsColor.name;
			for(var i =0;i<goodsColor.colors.length;i++){
				goodsInfos.colors[goodsInfos.colors.length] = goodsColor.colors[i];
			}
			if(goodsInfos.goodsIds.length==0){
				for(var i =0;i<goodsColor.goodsIds.length;i++){
					goodsInfos.goodsIds[goodsInfos.goodsIds.length] = goodsColor.goodsIds[i];
				}
			}
			console.log(JSON.stringify(goodsInfos));
			phantom.exit();
        },1000);
		
    });
}
buyGoods(url);




