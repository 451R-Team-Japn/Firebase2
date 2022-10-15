var currentuser;
var user;
var applicant;

$(document).ready(function () { 
	start();
});
function checkLogin(){
	alert("checkLogin");
	if (localStorage.getItem("ID") === null && sessionStorage.getItem("ID") === null){
		alert("logout()");
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
	else if(accounttype  == 'AccountAdmin' && page == 0)
		window.location.href = "admin.html";
	//else
		//window.location.href = "index.html";
	
}

$(document).on("click", "#logout" ,function() {
	logout();
	
});function logout() {
	localStorage.setItem("ID", null);
	sessionStorage.setItem("ID", null);
	
	window.location.href = 'index.html';
}


	