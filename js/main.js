/***** 공통사항 변수 선언 ******/
const log = console.log;

const mapKey = "543290867d5ebc18fb9238b9680b55c4" //한번 값을 주고나면 다른 값을 줄 수 없다(에러남)
var $bar = $(".navs_mo"); //제이쿼리를 품고 있는 변수라는 의미에서 앞에 $붙여서 직관적이게 쓴다
var $bar2 = $(".nav_close");
var $nav = $(".navs_mo_sub");
var navWid = $nav.width();

/***** 반응형/높이를 위한 resize ******/
$(window).resize(function(){
	navInit();	//모바일 네비게이션 가리기
	banInit();	//배너 Auto height
}).trigger("resize");

/***** 메인 배너 ******/
function banInit() {
	$(".banner_wrap").height($(".banner_wrap > li").height());
}

/***** 모바일 네비게이션 ******/
$bar.click(navToggle);
$bar2.click(navToggle);
function navInit() {
	navWid = $nav.width();
	if($(window).width() > 768) navHide();
	else navToggle();
}
function navHide() {
	$nav.css({"left":-navWid+"px"});
}
function navToggle() {
	if($nav.position().left == 0) $nav.stop().animate({"left": -navWid+"px"}, 500);
	else $nav.stop().animate({"left": 0}, 500);
}

/***** Masonry *****/
var masornyOption = {
	itemSelector: '.grid-item',  //그리드 하나하나의 아이템으로 적용시킨다
	columnWidth: '.grid-sizer',  //그리드 사이즈
	percentPosition: true
};
$('.grid').imagesLoaded( function() {
  $('.grid').masonry(masornyOption);
});

/***** 다음 지도 *****/
$(window).resize(function(){
	var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
	var options = {
		center: new daum.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
		level: 3 //지도의 레벨(확대, 축소 정도)
	};
	
	var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
	/* map.setDraggable(false);
	map.setZoomable(false); */
	
	
	var clusterer = new daum.maps.MarkerClusterer({
		map: map,
		gridSize: 35,
		averageCenter: true,
		minLevel: 6,
		disableClickZoom: true,
		styles: [{ //마커의 스타일
				width : '53px', height : '52px',
				background: 'url(cluster.png) no-repeat',
				color: '#fff',
				textAlign: 'center',
				lineHeight: '54px'
		}]
	});
	var marker = new daum.maps.Marker({
		position: new daum.maps.LatLng(33.450701, 126.570667)
	});
	clusterer.addMarker(marker);
}).trigger("resize");

/***** bt_top *****/
$("#bt_top").click(function(){
	$("html, body").stop().animate({"scrollTop":0}, 2000);
});

/*
var options = {
	speed: 3000,
	gap: 3000,
	type: "fade",
	pager: true
};
var mainBanner = new Slide($(".banner"), $(".banner_wrap"), $(".slide"), options);
var options = [{
	delay: 3000,
	speed: 1000
},{
	delay: 1000,
	speed: 200
},{
	delay: 2000,
	speed: 100
}];
var mainBanner = new FadeSlide($(".banner_wrap").eq(0).find(".slide"), options[0]);
var mainBanner2 = new FadeSlide($(".banner_wrap").eq(1).find(".slide"), options[1]);
var mainBanner3 = new FadeSlide($(".banner_wrap").eq(2).find(".slide"), options[2]);
//접근법
$(".banner_wrap").eq(0).find(".slide")
$(".slide", $(".banner_wrap").eq(0))
*/

//new SlideFade($(".slide"), {delay:3000, speed:1000});
var options = {
	delay: 3000,
	speed: 300,
	dir: -1,
	dirBtnUse: true,
	dirBtn:[$("#bt_prev"), $("#bt_next")]
};
var horiBanner = new SlideHori($("#banner1"), $("#banner1").find(".slide"), options);

/*
$(".banner_wrap").find(".slide")
$(".banner_wrap").children(".slide")
$(".slide", $(".banner_wrap"))
*/


/***** EmailJs *****/
/*
//선택자
document.getElementById('contact-form') //ES5
document.querySelector('#contact-form') //ES6
$("#contact-form") //jquery
document.getElementById('contact-form').addEventListener('submit', function(event) {
		event.preventDefault();
		this.contact_number.value = Math.random() * 100000 | 0;
		emailjs.sendForm('contact_service', 'contact_template', this);
});
*/
emailjs.init("user_O0nkvUFoqRLptUdUKEjX8"); //내걸로 쓰기!
$('#contact-form').on('submit', function(e) {
		e.preventDefault();
		$("input[name ='contact_number']").val(Math.random() * 100000 | 0);
		emailjs.sendForm('wooju', 'template_psNLlmiP', this).then(function(res){
			alert("메세지전송에 성공했습니다. \n빠른시간안에 답변 드리겠습니다.");
		}, function(err){
	  	alert("메세지전송이 실패했습니다. \n다시 시도해 주세요.");
		});
		$(this)[0].reset(); //폼을 다시 리셋 (제이쿼리를 자바스크립트로 바꿔서 리셋)
});

/***** 네비게이션 구현 *****/
$(".nav").click(goLoc);
$(".logo").click(goLoc);
function goLoc() {
	var nav = $(this);
	var i = $(this).data("page");
	var pos = $(".page").eq(i).offset().top;
	$("html, body").stop().animate({"scrollTop":pos}, 1000, function(){
		$(".nav").css({"color":"#333"});
		if(i > 0) nav.css({"color": "#b30"});
	});
}
//$("html, body").stop().animate({"scrollTop":2000}, 1000);