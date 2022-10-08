function writeApplicants(course){
	console.log("writeApplicants");
	localStorage.setItem("Course", course);
	location.href='applicants.html';
}
function sort() {
	$('.sortTable').DataTable();
}
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