function writeApplicants(course){
	localStorage.setItem("Course", course);
	location.href='applicants.html';
}
function editCourse(course){
	localStorage.setItem("Course", course);
	location.href='createposition.html';
}
$('#closebutton').click(function(){
	console.log("click");
	//console.log($(e.target).value());
	//await deleteDoc(doc(db, "GraderCourses2", course));
	//await deleteDoc(doc(db, "InstructorCourses2", course));
})
function getPagetype(){
	return 1;
}