function modal(){
	$('#positionModal').modal('toggle');
}
function getData(){
	var applicant = {};
	var count=0;
	var courses = {};
	var termsplit;
	var term;
	var year;
	var grad;
	var ctype = document.getElementById("CourseType").value;
	var cnumber = document.getElementById("CourseNumber").value;
	var position = document.getElementById("position").value;
	
	var level = document.getElementById("level").value;
	
	var notes = document.getElementById("notes").value;
	
	if(level=="BS")
		grad = false;
	else
		grad = true;
	
	applicant = {
    CourseNumber: cnumber,
	CourseType: ctype,
	GradCourse: grad,
	GraderOrLab: position,
    Notes: notes,
	Semester: null
	};
	
	return applicant;
}