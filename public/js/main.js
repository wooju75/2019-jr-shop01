const log = console.log;
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

//카테고리 HOME 생성
db.ref("root/home").on("child_added", homeAdd);
function homeAdd(data){ //homeAdd의 data를 받아서
 var html = `
 <li class="rt_arrow">
  <a href="${data.val().link}" target="${data.val().target}">${data.val().title}</a>
 </li>`;
 $(".nav_sub").eq(0).append(html);
}

// 카테고리 SHOP 생성 - Ajax/json 통신
$.ajax({
	type: "get", //get 타입은 문서상에서 안써도 자동으로 기본이 get타입이다
	url: "../json/shop.json", //나의 상위 폴더 주소
	data: {}, //안보내니까 생략가능
	dataType: "json", //데이터 타입은 제이슨방식으로 내가 보내겠다
	success: function(data) {
		var html = `<div class="shop_cates wrap clear">`;
		for(var i=0; i<data.cates.length; i++){
			html += `<ul>
			<li class="shop_cate_tit">${data.cates[i].tit}</li>
			<li>
				<ul class="shop_cate_names">`;
				for(var j=0; j<data.cates[i].data.length; j++) {
					html += `
					<li class="shop_cate_name rt_arrow">
					<a href="${data.cates[i].data[j].link}" target="${data.cates[i].data[j].target}">
					${data.cates[i].data[j].name}</a>
					</li>`;
				}
			html +=	`</ul></li></ul>`;
		}
		html += `</div><ul class="shop_prds wrap clear">`;
		for(var i=0; i<data.prds.length; i++) {
			html += `<li class="shop_prd">
				<a href="${data.prds[i].link}" target="${data.prds[i].target}">
				<img src="${data.prds[i].src}" class="img">
				</a>
			</li>`;
		}
		html += `</ul>`;
		$(".nav_sub").eq(1).append(html);
	},
	error: function(xhr) {
		log(xhr);
	}
});


// window.resize()구현 / .nav_sub 위치 잡기
$(window).resize(function(){
	$(".nav_sub").each(function(){
		
	});
}).trigger("resize");

//top_nav hover이벤트
$(".top_icon").mouseenter(function(){
 $(this).children("img").css({"opacity":.7});
});
$(".top_icon").mouseleave(function(){
	$(this).children("img").css({"opacity":1});
});

//nav 이벤트 (nav_sub show/hide)
$(".nav").mouseenter(function(){
 $(this).children(".nav_sub").css({"display":"block", "opacity":0}).stop().animate({"opacity":1, "top":"45px"},200); //.nav에 mouseenter하면 이것의 자식중.nav_sub의 css를 display:block, opacity:0으로 만들고 이벤트를 멈춘다음 animate를 실행한다
});
$(".nav").mouseleave(function(){
  $(this).children(".nav_sub").stop().animate({"opacity":0, "top":"80px"},200, function(){//현재 보여지고 있는 애들은 사라지게 한다
		$(this).css({"display":"none"});
	 });
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

//메인 네비 / .navs
//firebase.database().ref("root/test").push({test:"테스트"}).key;
