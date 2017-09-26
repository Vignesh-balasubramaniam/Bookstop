if($.cookie("css")) {
	$("link.changetheme").attr("href",$.cookie("css"));
}
$(document).ready(function() { 
   	var Theme1 = false;
	var Theme2 = false;
    var Theme3  = false;
	$("#th1").css({"background-color":"#2ABDD4"});
	$("#theme li a").click(function() { 
	   
		$("link.changetheme").attr("href",$(this).attr('rel'));
		
		$.cookie("css",$(this).attr('rel'), {expires: 365, path: '/'});
		
		return true;
	});
	$("#th1").click(function() {
	$("#th1").css({"background-color":"#2ABDD4"});
	$("#th2").css({"background-color":""});
	$("#th3").css({"background-color":""});
	});
	$("#th2").click(function() {
	$("#th1").css({"background-color":""});
	$("#th2").css({"background-color":"#7AA3CC"});
	$("#th3").css({"background-color":""});
	
	});
	$("#th3").click(function() {
	$("#th1").css({"background-color":""});
	$("#th2").css({"background-color":""});
	$("#th3").css({"background-color":"#0099CC"});
	
	});
});