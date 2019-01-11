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

// 공통 변수
var db = firebase.database();	//firebase의 데이터베이스 객체
var ref = null;
var key = "";

// 네비게이션 구현
$(".navs li").click(function(){
	$(".navs li").css({"color":"#aaa", "background-color":"transparent"});
	$(this).css({"color":"#fff", "background-color":"#444"});
});
$(".navs li").eq(0).trigger("click");

//page1 / HOME
(function(){
	ref = db.ref("root/home");
	ref.on("child_added", homeAdd);
}());
$("#bt1_save").click(function(){
	var $title = $("#title1");
	var $link = $("#link1");
	var $target = $("#target1");
	if($title.val() == ""){
		alert("제목을 입력하세요.");
		return;
	}
	if($link.val() == ""){
		alert("링크주소를 입력하세요.");
		return;
	}
	ref.push({
		title: $title.val(),
		link: $link.val(),
		target: $target.val()
	}).key;
	$title.val('');
	$link.val('');
});
function homeAdd(data) {
	var sel = ['', ''];
	if(data.val().target == "_blank") sel[0] = "selected";
	else sel[1] = "selected";
	var html = `
	<div id="${data.id}">
		<input type="text" class="w3-input w3-border w3-show-inline-block" 
		value="${data.val().title}">
		<input type="text" class="w3-input w3-border w3-show-inline-block" 
		value="${data.val().link}">
		<select class="w3-select w3-border w3-show-inline-block">
			<option value="_blank" ${sel[0]}>새창</option>
			<option value="_self" ${sel[1]}>현재창</option>
		</select>
		<button type="button" class="w3-indigo w3-button">수정</button>
		<button type="button" class="w3-red w3-button">삭제</button>
	</div>`;
	$("#homes").append(html);
}