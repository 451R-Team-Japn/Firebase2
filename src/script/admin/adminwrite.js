function writeApplicants(course){
	localStorage.setItem("Course", course);
	location.href='applicants.html';
}
function editCourse(course){
	localStorage.setItem("Course", course);
	location.href='createposition.html';
}
function getPagetype(){
	return 1;
}