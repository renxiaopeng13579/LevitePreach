
define(["jquery"], function($){
	function Control(obj) {
			this.audio = obj.audio;
			this.prev = obj.prev;
			this.next = obj.next;
			this.play = obj.play;
			this.time_m = obj.time_m;
			this.time_s = obj.time_s;
			this.progress = obj.progress;
			this.musicImg = obj.musicImg;
			this.musicTit = obj.musicTit;
			this.musicOther =  obj.musicOther,
			this.lists =obj.lists,
			this.index = location.search.substr(7)? location.search.substr(7)-0:0;
			this.order = 0 ;
			this.tigger = true;
			this.timer = null;
			this.init();
		}
		/*
			duration  : 音频多长时间
			currentTime ：当前播放那块时间
			
		 播放器 ： 歌曲列表 、 、    每 多长时间 、  播放显 进度 、     上一首 下一首 按钮  、音量
		 播放顺序 ：0代表 ，顺序播放其实做的是 列表循环、 1代表， 单曲循环 ，2代表 ，随机播放
		 选择歌曲模式：
		 
		 选择歌曲列表： 
		 上一首
		 下一首
		  主控 ：   开始和暂停 ；
		 歌曲进度 
		 自动模式；
		 
		 加载 要播放的歌曲 信息链接 ：
		 
		 时间进度
		 
		 
		 警告容器：
		 
		 
		 */
	Control.prototype = {
		init: function() {
			var that = this,
				html = '';
			if(!this.audio.play){
				$(".auido-box").html("您的浏览器不支持音频标签。")
			}
			this.play.on("click .glyphicon-play", function(){
				if(that.tigger){
					that.playAudio();				
				}else{
					that.pauseAudio();				
				}
			});
			this.prev.on("click", function(){
				that.prevSong();
			});
			this.next.on("click", function(){
				that.nextSong();
			});
			$(this.audio).on("ended",function(){//播放完触发			
				that.autoPlay();
			});
			$(this.audio).on("canplaythrough",function(){
				that.times = Math.floor(that.audio.duration) ? Math.floor(that.audio.duration)  : 1;
				that.setplayTime(that.times);					
			});		
			this.loadMusic();
			this.pauseAudio();
			 $.each(this.lists, function(index,item){
				if(that.index ==index){
					html += "<li class='on'>"+ (index+1) +"."+item.title +"</li>"	
				}else{
						html += "<li >"+ (index+1) +"."+item.title +"</li>"	
				}
								
			 });
			  $(".auido-list ol").html(html)
			  $(".auido-list li").click(function(){	      
					that.index = $(this).index();
					that.loadMusic();
			  })
		},		
		playAudio: function(){
			var that = this;
			this.audio.play();
			that.progress.width(0);
			that.timer =setInterval(function(){
				that.timePlay(); 
			},1000)
			that.tigger = false;
			that.play.addClass("glyphicon-pause");		
		},
		pauseAudio: function(){
			this.audio.pause();
			clearInterval(this.timer)
			this.tigger = true;
			this.play.removeClass("glyphicon-pause");		
		},
		prevSong : function(){
			this.index -= 1;
			if(this.index < 0){
				this.index = this.lists.length -1;
			}
			this.loadMusic();
		},
		nextSong : function(){
			this.index += 1;
			if(this.index == this.lists.length){
				this.index= 0
			}
			this.loadMusic();
		},
		loadMusic:function(){	
				
			this.pauseAudio();
			var music = this.lists[this.index];		
			var song = "";
			if($.isArray(music.song)){
			//	song = "http://www.51beaut.com/music/media/"+music.song[0]+".mp3"				
			}else{
				song ="http://mp3-001.55f3d185b13b8.d01.nanoyun.com/主日讲道MP3/"+music.song
			}
				
			this.audio.src = song;
			//http://mp3-001.55f3d185b13b8.d01.nanoyun.com/主日讲道MP3/
			//this.musicImg.attr("src","http://www.51beaut.com/music/data/"+music.src)
			this.musicTit.html(music.title)
			this.musicOther.html(music.other)
			this.playAudio();	
			$(".auido-list li").eq(this.index).addClass("on").siblings("li").removeClass("on"); 		
			$("#download-mp3").attr({"href":this.audio.src , "download":music.title});
		},
		autoPlay: function(){//判断播放模式		
			switch(this.order){
				case 0:
				this.nextSong();
				break;
				case 1:
				this.playAudio();
				break;
				case 2:
				this.index = Math.floor(this.lists.length * Math.random());	
				this.loadMusic();
			}
					
		},
		timePlay: function(){
			var nowTime = this.audio.currentTime;		
			var num =  (nowTime/this.times*100).toFixed(2);		
			this.progress.css("width",num +"%");	
			this.setplayTime(nowTime);		
	},
	setplayTime :function(time){
		var M = Math.floor(time/60);
		var S = Math.floor(time%60);
		this.time_m.html(M>10?M:"0"+M);
		this.time_s.html(S>10?S:"0"+S);
	}
	
}

return{
	control : Control
	
}

})