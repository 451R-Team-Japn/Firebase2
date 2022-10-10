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
function Search() {
  var input = document.getElementById("Search");
  var filter = input.value.toLowerCase();
  var nodes = document.getElementsByClassName('target');

  for (i = 0; i < nodes.length; i++) {
    if (nodes[i].innerText.toLowerCase().includes(filter)) {
      nodes[i].style.display = "block";
    } else {
      nodes[i].style.display = "none";
    }
  }
}