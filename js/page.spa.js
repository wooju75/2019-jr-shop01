var gap = 300; //페이지가 나타나기 전 px
var now = 0; //현재페이지
var scTop = 0; //현재 문서의 scrollTop
var pages = new Array(); //각각의 페이지의 상단으로부터 떨어진 거리 (배열)

$("body").imagesLoaded(function(){ //바디안에있는 모든 이미지가 로드되면 실행
 $(".page").each(function(i){ //페이지 각각에 실행
  pages[i] = $(this).offset().top; //각각에 페이지의 높이를 넣음
 });
});
$(window).scroll(function(e){
	$(".page").each(function(i){ //페이지 각각에 실행
		pages[i] = $(this).offset().top; //각각에 페이지의 높이를 넣음
	 }); //masorny가 다 돌고나서 top값을 잡는다
	scTop = $("html, body").scrollTop();
	now = pages.length - 1;
	for(var i in pages) {
		if(scTop + gap < pages[i]) {
			now = i - 1;
			break;
		}
	}
	$(".page").eq(now).find(".spa_ani").each(function(){
		var name = "opaShow";
		var duration = "0.5s";
		var delay = 0;
		if($(this).data("name") != "" && $(this).data("name") != undefined) {
			name = $(this).data("name");	//html에서 data-name 값
		}
		if($(this).data("duration") != "" && $(this).data("duration") != undefined) {
			duration = $(this).data("duration");	//html에서 data-duration 값
		}
		if($(this).data("delay") != "" && $(this).data("delay") != undefined) {
			delay = $(this).data("delay");	//html에서 data-delay 값
		}
		$(this).css({
			"animation-name": name, 
			"animation-duration": duration,
			"animation-delay": delay
		});
	});//spa_ani를 갖고 있을때만 사용할 수 있음 

	$(".page").eq(now).find(".fn_ani").each(function(){
	 eval($(this).data("fn")+"($(this))");
 });
});
function barMove(obj){
 if(obj.width() == 0) obj.stop().animate({"width":obj.html()}, 2000);
}