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
db.ref("root/home").on("child_added", homeAdd);
function homeAdd(data){ //homeAdd의 data를 받아서
 var html = `
 <li class="rt_arrow">
  <a href="${data.val().link}" target="${data.val().target}">${data.val().title}</a>
 </li>`;
 $(".nav_sub").eq(0).append(html);
}

//top_nav hover이벤트
$(".top_icon").mouseenter(function(){
 $(this).children("img").css({"opacity":.7});
});
$(".top_icon").mouseleave(function(){
	$(this).children("img").css({"opacity":1});
});

//nav 이벤트 (nav_sub show/hide)
$(".nav").mouseenter(function(){
 $(this).children(".nav_sub").css({"display":"block", "opacity":0}).stop().animate({"opacity":1, "top":"45px"}); //.nav에 mouseenter하면 이것의 자식중.nav_sub의 css를 display:block, opacity:0으로 만들고 이벤트를 멈춘다음 animate를 실행한다
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
