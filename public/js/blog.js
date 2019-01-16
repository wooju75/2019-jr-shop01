 //HTML Header Include
w3.includeHTML(function(){
 $(".navs li").click(function(){
  location.href = $(this).data("src");
 });
});


// database = CRUD(Create/Read/Update/Delete)
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

$(".navs li").click(function(){
	location.href = $(this).data("src");
});

// 공통 변수
var db = firebase.database();	//firebase의 데이터베이스 객체
var ref = null;
var key = "";

init();
function init(){
 ref = db.ref("root/blog");
 ref.on("child_added", onAdd);
 ref.on("child_removed", onRev);
 ref.on("child_changed", onChg);
}
function onAdd(data){

}
function onRev(data){

}
function onChg(data){

}