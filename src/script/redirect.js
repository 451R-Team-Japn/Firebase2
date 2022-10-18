var currentuser;
var user;
var applicant;

$(document).ready(function () { 
	start();
});
function checkLogin(){
	console.log("checkLogin");
	if (localStorage.getItem("ID") === null && sessionStorage.getItem("ID") === null){
		logout();
		return true;
	}
	else
		return false;
}
function start(){
	var accounttype = localStorage.getItem("Type");
	var studentpage; 
	var page;
	
	checkLogin();
	
	if (typeof getPagetype === "function"){
		page = getPagetype();
		studentpage = true;
	}
	else
		studentpage = false;
	
	redirect(accounttype, page);
	
	console.log(accounttype);
}
function redirect(accounttype, page){
	console.log("accounttype: "+accounttype+" studentpage: "+page);
	if(accounttype == 'AccountStudent' && page == 1)
		window.location.href = "studentform.html";	
}

$(document).on("click", "#logout" ,function() {
	logout();
});
function logout() {
	localStorage.removeItem("ID");
	sessionStorage.removeItem("ID");
	localStorage.removeItem("Type");
	sessionStorage.removeItem("Type");
	
	window.location.href = 'login.html';
}


	