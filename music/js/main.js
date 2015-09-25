require.config({
　　　　baseUrl: "js/",
　　　　paths:{
			jquery :"//cdn.bootcss.com/jquery/1.11.3/jquery.min"
		}
});

require(['select_text',"jquery"], function (Control,$){
		$(document).ready(function() {	
            
            var myMusicControl = new Control.control({
						audio : document.getElementById("myMusic"),
						prev : $("#prev-mp3"),
						next : $("#next-mp3"),
						play : $("#play-mp3"),
						time_m : $("#mins"),
						time_s : $("#seconds"),
						progress :$("#progress-mp3"),
						musicImg : $("#music-img"),
						musicTit : $(".mp3-tit"),
						musicOther : $(".mp3-other"),
						lists : lists
					  });
		/*$.ajax({
					type: "get", 
					//async: false, 
					url: "http://www.51beaut.com/music/admin/index.php/Home/API/index/callback/callback=?",
					dataType: "jsonp", 
					jsonp: "jsonpcallback",		//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback) 
					//jsonpCallback: "receive",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据 
					success: function (datas) {	      
					  
					}, 
					error: function () { 
						alert('fail'); 
					} 
			   });*/
		   });
	
});
