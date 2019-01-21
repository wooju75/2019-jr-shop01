const log = console.log;
//$.ajax() 객체화
var Ajax = (function(){
	function Ajax(url, fn, opts) {
		var obj = this;
		this.url = url;
		this.fn = fn;
		if(opts) {
			if(opts.type) this.opts.type = opts.type; 
			if(opts.dataType) this.opts.dataType = opts.dataType; 
			if(opts.data) this.opts.data = opts.data;
		}
		else {
			this.opts = {};
			this.opts.type = "get";
			this.opts.dataType = "json";
			this.opts.data = {};	
		}
		$.ajax({
			type: obj.opts.type,
			url: obj.url,
			data: obj.opts.data,
			dataType: obj.opts.dataType,
			success: obj.fn,
			error: function(xhr, status, error) {
				console.log(xhr, status, error);
			}
		}); 
	}
	return Ajax;
}());


// Fidebase Init
var config = {
	apiKey: "AIzaSyDIzp4n1G1f_Xa_DVqhxeojAWCjcDPLHwE",
	authDomain: "wooju-shop01.firebaseapp.com",
	databaseURL: "https://wooju-shop01.firebaseio.com",
	projectId: "wooju-shop01",
	storageBucket: "wooju-shop01.appspot.com",
	messagingSenderId: "428495628233"
};
firebase.initializeApp(config);
//Firebase Init
var db = firebase.database();

mainInit();
function mainInit() {
	db.ref("root/home").on("child_added", homeAdd);
	db.ref("root/blog").on("child_added", blogAdd);
}

//카테고리 HOME 생성
function homeAdd(data) {
	var html = `
	<li class="rt_arrow">
		<a href="${data.val().link}" target="${data.val().target}">${data.val().title}</a>
	</li>`;
	$(".nav_sub").eq(0).append(html);
}
//카테고리 BLOG 생성
function blogAdd(data) {
	var html = `<ul id="${data.key}" class="grid-item">
		<li class="grid-tit">${data.val().name}</li>
	</ul>`;
	$(".grid").append(html);
	db.ref("root/blog/"+data.key+"/sub").once("value", function(sub){
		sub.forEach(function(v, i){
			html = `
			<li class="rt_arrow" id="${v.key}">
				<a href="${v.val().link}" target="${v.val().target}">${v.val().name}</a>
			</li>`;
			$("#"+data.key).append(html);
		});
	});
}

// 카테고리 SHOP 생성 - Ajax/json 통신
var shopAjax = function(data) {
	var html = `<div class="shop_cates wrap clear">`;
	for(var i=0; i<data.cates.length; i++) {
		html += `
		<ul>
			<li class="shop_cate_tit">${data.cates[i].tit}</li>
			<li>
				<ul>`;
		for(var j=0; j<data.cates[i].data.length; j++) {
			html += `
			<li class="shop_cate_name rt_arrow">
			<a href="${data.cates[i].data[j].link}" target="${data.cates[i].data[j].target}">
			${data.cates[i].data[j].name}</a>
			</li>`;
		}
		html += `
				</ul>
			</li>
		</ul>`;
	}
	html += `</div>`;
	html += `<ul class="shop_prds">`;
	for(i=0; i<data.prds.length; i++) {
		html += `
		<li class="shop_prd ovhide"><a href="${data.prds[i].link}" target="${data.prds[i].target}">
		<img src="${data.prds[i].src}" class="img size_ani">
		</a>
		</li>`;
	}
	html += `</ul>`;
	$(".nav_sub").eq(1).append(html);
};
new Ajax("../json/shop.json", shopAjax);

// 카테고리 PORTFOLIO 생성 - Ajax/json 통신
var portAjax = function(data) {
	for(var i in data.ports) {
		var html = `
		<li class="rt_arrow">
			<a href="${data.ports[i].link}" target="${data.ports[i].target}">
			${data.ports[i].name}</a>
		</li>`;
		$(".nav_sub").eq(3).append(html);
	}
}
new Ajax("../json/port.json", portAjax);

// 메인 좌측 네비 - lefts - Ajax/json 통신
new Ajax("../json/left.json", leftAjax);
function leftAjax(data){
  var html; 
	for(var i in data.lefts){
	html = `<li class="rt_arrow">${data.lefts[i].name}</li>`;
	$(".left").append(html);
 }
}




// window.resize()구현 
$(window).resize(function(){
	
}).trigger("resize");


// top_nav hover 이벤트
$(".top_icon").mouseenter(function(){
	$(this).children("img").css({"opacity":.7});
});
$(".top_icon").mouseleave(function(){
	$(this).children("img").css({"opacity":1});
});

// nav 이벤트 (nav_sub show/hide)
$(".nav").mouseenter(function(){
	$(this).children(".nav_sub").css({"display":"block", "opacity":0}).stop().animate({"opacity":1, "top":"45px"}, 200);
});
$(".nav").mouseleave(function(){
	$(this).children(".nav_sub").stop().animate({"opacity":0, "top":"80px"}, 200, function(){
		$(this).css({"display":"none"});
	});
});

// rt_wings 이벤트
$(".top_nav .fa-bars").click(function(){
	var $bg = $(".rt_bg");
	var $cont = $(".rt_cont");
	$bg.css({"opacity":0, "display":"block"}).stop().animate({"opacity":.3}, 1000);
	$cont.css({"display":"block", "right":"-240px"}).stop().animate({"right":0}, 1000);
});

$(".rt_cont .fa-close").click(function(){
	var $bg = $(".rt_bg");
	var $cont = $(".rt_cont");
	$bg.stop().animate({"opacity":0}, 800, function(){
		$(this).css({"display":"none"});
	});
	$cont.stop().animate({"right":"-240px"}, 800, function(){
		$(this).css({"display":"none"});
	});
});

$(".rt_bg").click(function(e){
	e.stopPropagation();
	$(".rt_cont .fa-close").trigger("click");
});

//메인배너 / .bans
/* fadeShow();
function fadeShow(){
	var $wrap = $(".ban");
	var $slide = $(".ban > li");
	var depth = 100; //z-index
	var now = 0; //순번
	var speed = 500; //스피드
	var timeout = 3000; //
	var end = $slide.length - 1;
	var interval = setInterval(fadeAni, timeout);
	function fadeAni(){
		$slide.eq(now).css({"z-index":depth++, "opacity":0}).stop().animate({"opacity":1}, speed,
		function(){
		 if(now == end) now = 0;
		 else now++;
		});
	}
} */
/* horzShow();
function horzShow(){
	$(".ban").append($(".ban > li").eq(0).clone());
	var $wrap = $(".ban");
	var $slide = $(".ban > li");
	var now = 0; //순번
	var speed = 500; //스피드
	var timeout = 3000; //
	var end = $slide.length - 1;
  $slide.each(function(i){
	 $(this).css({"left":(i*100)+"%"});
	 $wrap.height($(this).height());
	});
	var interval = setInterval(horzAni, timeout);
  function horzAni(){
   $wrap.stop().animate({"left":(-now*100)+"%"}, 200, function(){
    if(now == end) {
			$wrap.css({"left":0});
			now = 1;
		}
		else now++;
	 });
	}
} */
vertShow();
function vertShow() {
	$(".ban").append($(".ban > li").eq(0).clone());
	var $wrap = $(".ban");
	var $slide = $(".ban > li");
	var now = 1;
	var speed = 500;
	var timeout = 3000;
	var end = $slide.length - 1;
	$(window).resize(function(){
		$(".bans").height($slide.height());
	}).trigger("resize");
	var interval = setInterval(vertAni, timeout);
	function vertAni() {
		var top = 0;
		if(now > 0) top = $slide.eq(now-1).position().top + $slide.eq(now-1).height();
		$wrap.stop().animate({"top":-top+"px"}, speed, function(){
			if(now == end) {
				$wrap.css({"top":0});
				now = 1;
			}
			else now++;
		});
	}
}

