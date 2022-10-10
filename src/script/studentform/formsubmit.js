var validating = false;
var totalCourses

function submitForm(){
	var form = $("#application");
	validateForm();
	if(form[0].checkValidity() === true){
		console.log("submitForm");
		return true;
	}else
		return false;
}
function modal(){
	$('#exampleModal').modal('toggle');
}
function validateForm(){
	var html='';
	var courses = document.getElementsByClassName("courses");
	
	totalCourses = courseLimitcheck(courses);
	
	validating = true;
	if(!courseChecked(courses)){
		html='You must check at least one course.';
		document.getElementById("submiterror").hidden = false;
		$("#submiterror").html(html);
		return false;
	/*} else if(totalCourses > totalCoursesllowed){
		html='You must check less than '+totalCoursesllowed+' courses.';
		setremoveDisabled(true, courses);
		document.getElementById("submiterror").hidden = false;
		$("#submiterror").html(html);
		return false;*/
	} else {
		setremoveDisabled(false, courses);
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
			courseinput.setAttribute("class", "input-group is-invalid");
		} else {
			list[j].removeAttribute('required');
			courseinput.removeAttribute("class");
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
function getData(){
	var applicant = {};
	var termsplit;
	var term;
	var year;
	var fname = document.getElementById("fname").value;
	var lname = document.getElementById("lname").value;
	var stuID = document.getElementById("studentID").value;
	var email = document.getElementById("email").value;
	var degree = document.getElementById("undergraduatedegree").value;
	var gpa = document.getElementById("GPA").value;
	var hours = document.getElementById("hours").value;
	var gradterm = document.getElementById("grad").value;
	var major = document.getElementById("major").value;
	var level = document.querySelector('input[name="level"]:checked').value;
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
	
	console.log("fname => "+fname);
	console.log("lname => "+lname);
	console.log("stuID => "+stuID);
	console.log("email => "+email);
	console.log("degree => "+degree);
	console.log("gpa => "+gpa);
	console.log("hours => "+hours);
	console.log("term => "+term);
	console.log("year => "+year);
	console.log("major => "+major);
	console.log("level => "+level);
	console.log("courses => "+courses);
	
	
	applicant = {
	//FirstName: fname,
	//LastName: lname,
	//StudentID: stuID,
	//Email: email,
    Course1: courses[0],
	Course2: courses[1],
	Course3: courses[2],
    Course4: courses[3],
    Course5: courses[4],
    CurrentLevel: level,
	GPA: gpa,
	GraduatingTerm: term,
	GraduatingYear: year,
	Hours: hours,
    Major: major,
    UndergradDegree: degree
	};
	console.log("applicant => "+applicant);
	
	return applicant;

	
}
function listCourses(){
	var list = document.getElementsByClassName("courses");
	var courses = [];
	var j = 0;
	for(var i=0; list[i]; ++i){
      if(list[i].checked){
		   console.log(list[i].value);
           courses[j] = list[i].value;
		   j++;
	  }
	}
	for(var k=0; k<5; ++k){
		console.log(courses[k]);
      if(courses[k]==null){
           courses[k] = "";
	  }
	}
	return courses;
}
function writeData(level, gradtermtext, majortext){
	//var courses = graderlist.concat(lablist);
			
	var data = {currentlevel:level, graduatingsemester:gradtermtext, course1:courses[0], course2:courses[1], course3:courses[2], course4:courses[3],course5:courses[4]};
	alert(level);
	alert(majortext);
	alert(gradtermtext);
	
	alert(data.course2);
	
	//if(courseChecked('grader'))
		//alert(graderlist);
	//if(courseChecked('lab'))
		//alert(lablist);
	
}
function writeCourses(courseType, amount) {
	var inputElements = document.getElementsByClassName(courseType);
	var courseslist = [amount];
	
	for(var i=0; i<courseslist.length; i++)
		courseslist[i]= "";
	
	for(var j = 0; j<courseslist.length;){
		for(var i=0; inputElements[i]; ++i){
			if(inputElements[i].checked){
				courseslist[j] = inputElements[i].value;
				++j;
			}
		}
	}
	return courseslist;
}