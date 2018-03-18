system = require('system');
address = system.args[1];//获得命令行第二个参数 接下来会用到     
var page = require('webpage').create();   
var url = address; 
var settings = {
  operation: "GET",
  encoding: "utf-8",
  headers: {
    "Content-Type": "application/json",
	"User-Agent":"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Mobile Safari/537.36"
  }
};  
page.settings.loadImages = false;
page.settings.resourceTimeout = 60000; 
window.setTimeout(function () {
            phantom.exit();
        }, 120000);
page.open(url,settings,function (status) {  
    if (status == 'success') {   
        console.log(page.content);  
    } 
    phantom.exit();
});