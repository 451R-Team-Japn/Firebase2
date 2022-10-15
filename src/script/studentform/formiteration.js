//var data=users["users"];
var current;
var totalCoursesllowed = 5;
const module = {};
	
$(document).ready(function () { 
	populateTerms();
	writeCourselimit();
});
function writeCourselimit() {
	var html="Courses (choose of up to "+totalCoursesllowed+"):";	
	$("#courseslegend").html(html);
}
function populateTerms(){
	const d = new Date();
	let month = d.getMonth()+1;
	let year = d.getFullYear();
	var intyear
	var terms;
	var term;
	var option;
	var select = document.getElementById("grad");
	
	if(month>=8)
		terms = ["Fall ", "Spring ", "Summer "];
	else if(month<=5)
		terms = ["Spring ", "Summer ", "Fall "];
	else 
		terms = ["Summer ", "Fall ", "Spring "];
	
	for(var i=0;i<4;i++){
		intyear = parseInt(year) + i;
		for(var j=0;j<3;j++){
			term = (terms[j]+intyear);
			option = document.createElement('option');
			option.text = option.value = term;
			select.add(option, select.length);
		}
	}
}