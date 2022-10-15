$(document).on("click", "#logout" ,function() {
	logout();
	
});function logout() {
	localStorage.setItem("ID", null);
	sessionStorage.setItem("ID", null);
	
	window.location.href = 'index.html';
}