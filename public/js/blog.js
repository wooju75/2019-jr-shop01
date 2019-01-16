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
var lastKey = "";

init();
function init() {
	ref = db.ref("/root/blog");
	ref.on("child_added", onAdd);
	ref.on("child_removed", onRev);
	ref.on("child_changed", onChg);
}
function onAdd(data) {
	db.ref("root/blog").limitToLast(1).once("value", function(snapshot){
		//forEach 는 jQuery each 와 똑같다.
		snapshot.forEach(function(v){
			lastKey = v.key;
		});
	});
	$("#mc_sel").prepend(`<option value="${data.key}">${data.val().name}</option>`);
	$("#mc_sel option").each(function(){
		if($(this).attr("value") == lastKey) {
			$(this).attr("selected", true);
			var html = `
			<input type="text" id="mc_chg" class="w3-input w3-border w3-show-inline-block" value="${data.val().name}">
			<button class="w3-button w3-green mc_chg" onclick="mcChg(this);">수정</button>
			<button class="w3-button w3-red mc_rev" onclick="mcRev(this);">삭제</button>
			<input type="text" id="sc_in" class="w3-input w3-border w3-show-inline-block" placeholder="서브카테고리 이름">
			<button id="sc_save" class="w3-button w3-indigo">저장</button>
			`;
			$(".cont_wrap").empty().append(html);
		}
		else  $(this).attr("selected", false);
	});
	$("#mc_sel").trigger("change");
}
function onRev(data) {

}
function onChg(data) {

}

$("#mc_save").click(function(){
	if($("#mc_in").val() == "") {
		alert("메인 제목!!");
		$("#mc_in").focus();
		return;
	}
	ref = db.ref("/root/blog");
	ref.push({
		name: $("#mc_in").val()
	}).key;
	$("#mc_in").val("");
});

$("#mc_sel").change(function(){
	$("#mc_chg").val($(this).children("option:selected").text());
});