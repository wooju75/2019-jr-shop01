//top_nav hover이벤트
$(".top_icon").mouseenter(function(){
 $(this).children("img").css({"opacity":.7});
});
$(".top_icon").mouseleave(function(){
	$(this).children("img").css({"opacity":1});
});

//rt_wings 이벤트
$(".top_nav .fa-bars").click(function(){
 var $bg = $(".rt_bg");
 var $cont = $(".rt_cont");
 $bg.css({"opacity":0, "display":"block"}).stop().animate({"opacity":.3},1000) /* css를 주고 애니메이트~ */
 $cont.css({"display":"block", "right":"-240px"}).stop().animate({"right":0},1000) /* css를 주고 애니메이트~ */
 });
 
$(".rt_cont .fa-close").click(function(){
 var $bg = $(".rt_bg");
 var $cont = $(".rt_cont");
 $bg.stop().animate({"opacity":0},1000, function(){
	$(this).css({"display":"none"});
	});
 $cont.stop().animate({"right":"-240px"},1000, function(){
	$(this).css({"display":"none"});
	}); 
});