/*function writeApplicants(course){
	console.log("writeApplicants");
	localStorage.setItem("Course", course);
	location.href='applicants.html';
}*/

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

$(document).ready(function () { 
	
});
function changeDoc(value){
	document.getElementById("iframepdf");
	$("#iframepdf").attr("src", "files/"+value+".pdf");
	$("#myModalLabel").html(value);
	modal();
}

function modal(){
	$('#courseModal').modal('toggle');
}

function getPagetype(){
	return 1;
}