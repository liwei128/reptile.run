var fs = require('fs');
var url = "https://account.xiaomi.com/pass/serviceLogin?callback=https%3A%2F%2Forder.mi.com%2Flogin%2Fcallback%3Ffollowup%3Dhttps%253A%252F%252Fwww.mi.com%252Findex.html%26sign%3DMjM0MWU0NjBlOTU1YzY4NGQzOTc3MDk4N2M2MjQ5Y2ZiZTMxNTFlZQ%2C%2C&sid=mi_eshop&_bannerBiz=mistore&_qrsize=180";
var user = JSON.parse(fs.read(fs.workingDirectory+'/config/user.json'));

var page = require('webpage').create();    
var settings = {
  operation: "GET",
  encoding: "utf-8",
  headers: {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.170 Safari/537.36"
  }
};  
page.settings.loadImages = false;
page.settings.resourceTimeout = 20000; 
window.setTimeout(function () {
            phantom.exit();
        }, 12000);
page.onAlert = function(test){
    console.log(test);
}



function login(){
    phantom.clearCookies();
    page.open(url,settings,function (status) { 
        if (status == 'success') { 
            page.injectJs("./zepto.min.js",function(){
            });
            page.evaluate(function(userName,password){
                $("input[name='user']").val(userName);
                $("input[name='password']").val(password);
                $("input[type='submit']").click();
            },user.userName,user.password);  
        }
        setTimeout(function(){
            var loginStatus = page.evaluate(function(){
                var user = $("#J_userInfo>span.user").html();
				var error = $("span.error-con").html();
				if(error){
					return "pwd";
				}
                if(user){
                    return "ok";
                }
                return "cache";
            });  
            if(loginStatus == "ok"){
                console.log(JSON.stringify(page.cookies));
            }else{
				console.log(loginStatus);
			}
            phantom.exit();
        }, 5000);
    
    });
    
}

login();

    
