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

//메인 네비 / .navs
//firebase.database().ref("root/test").push({test:"테스트"}).key;
