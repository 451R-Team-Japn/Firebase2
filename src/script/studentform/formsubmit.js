var validating = false;
var totalCourses;
var submitTried = false;

function submitForm(){
	var form = $("#application");
	validateForm();
	
	submitTried = true;

	if(form[0].checkValidity() === true){
		return true;
	}else
		return false;
}
function modal(){
	$('#formModal').modal('toggle');
}
function validateForm(){
	var html='';
	var courses = document.getElementsByClassName("courses");
	var gtastatus = $('input[name="GTA"]:checked').val();
	
	totalCourses = courseLimitcheck(courses);
	
	if(gtastatus == 0)
		changeUpload('gtaf');
	
	validating = true;
	if(!courseChecked(courses)){
		//html='You must check at least one course.';
		//document.getElementById("submiterror").hidden = false;
		//$("#submiterror").html(html);
		return false;
	} else {
		//setremoveDisabled(false, courses);
		return true;	
	}	
}
function courseChecked(list){
	for(var i=0; list[i]; ++i){
      if(list[i].checked){
           return true;
	  }
	}
	return false;
}
function validateCourses(){
	var courses = document.getElementsByClassName("courses");
	totalCourses = courseLimitcheck(courses);
	
	if(validating)
		validateForm();
	
	if(totalCourses == totalCoursesllowed)
		setremoveDisabled(true, courses);
	else
		setremoveDisabled(false, courses);
	
	if(courseChecked(courses))
		setremoveRequired(false, courses);
	else
		setremoveRequired(true, courses);
}
function setremoveRequired(set, list){
	var courseinput = document.getElementById("courseinput");
	
	for(var j=0; list[j]; ++j){
		if(set){
			list[j].setAttribute('required', '');
			courseinput.setAttribute("class", "input-group is-course-invalid");
		} else {
			list[j].removeAttribute('required');
			courseinput.setAttribute("class", "input-group is-course-valid");
		}
	}
}
function setremoveDisabled (set, list){
	for(var j=0; list[j]; ++j){
		if(set){
			if(!list[j].checked)
				list[j].disabled = true;
		} else {
			list[j].disabled = false;
		}
	}
}
function courseLimitcheck(courses){
	var coursesamount = 0;
	for(var i=0; courses[i]; ++i){
      if(courses[i].checked)
		   coursesamount++;
	}
	return coursesamount;
}
function updateUser(){
	var user = {};
	var level = parseInt(document.querySelector('input[name="level"]:checked').value);
	var gta = parseInt($('input[name="GTA"]:checked').val());
	var major = parseInt(document.getElementById("major").value);
	var gtastatus;	
	
	if(gta == 0 || gta == 4)
		gtastatus = 1;
	else if(parseInt(gta) == 2)
		gtastatus = 2;
	else
		gtastatus = 0;		

	user = {
	CurrentLevel: level,
	GTACertified: gtastatus,
	Major: major
	};
	
	return user;
}
function getData(){
	var applicant = {};
	var termsplit;
	var term;
	var year;
	var degree = document.getElementById("undergraduatedegree").value;
	var gpa = parseInt(document.getElementById("GPA").value);
	var hours = parseInt(document.getElementById("hours").value);
	var gradterm = document.getElementById("grad").value;
	var major = document.getElementById("major").value;
	var courses = listCourses();
	var file;
	
	termsplit = gradterm.split(' ');
	year=parseInt(termsplit[1]);
	
	if(termsplit[0]=="Fall")
		term=0;
	else if(termsplit[0]=="Spring")
		term=1;
	else
		term=2;	
	
	applicant = {
		Course1: courses[0],
		Course2: courses[1],
		Course3: courses[2],
		Course4: courses[3],
		Course5: courses[4],
		GPA: gpa,
		GraduatingTerm: term,
		GraduatingYear: year,
		Hours: hours,
		UndergradDegree: degree
	};
	
	return applicant;
}
function getFiles(){
	var files = {};	
	
	const rfInput = document.getElementById('rf');
	const tfInput = document.getElementById('tf');
	const gfInput = document.getElementById('gf');
	
	const rf = rfInput.files[0];
	const tf = tfInput.files[0];
	const gf = gfInput.files[0];
	
	files = {
		Resume: {
			Name: "resume",
			File: rf
		},
		Transcript: {
			Name: "transcript",
			File: tf
		},
		GTA: {
			Name: "gta",
			File: gf
		}
	};
	
	return files;
}
function listCourses(){
	var list = document.getElementsByClassName("courses");
	var courses = [];
	var j = 0;
	for(var i=0; list[i]; ++i){
      if(list[i].checked){
           courses[j] = list[i].value;
		   j++;
	  }
	}
	for(var k=0; k<5; ++k){
      if(courses[k]==null){
           courses[k] = "";
	  }
	}
	return courses;
}