var validating = false;

function submitForm(){
	if(validateForm()){
		getData();
	}else
		return false;
}
function validateForm(){
	var html='';
	var courses = document.getElementsByClassName("courses");
	
	var totalCourses = courseLimitcheck(courses);
	
	validating = true;
	if(!courseChecked(courses)){
		html='You must check at least one course.';
		document.getElementById("submiterror").hidden = false;
		$("#submiterror").html(html);
		return false;
	} else if(totalCourses > totalCoursesllowed){
		html='You must check less than '+totalCoursesllowed+' courses.';
		setremoveDisabled(true, courses);
		document.getElementById("submiterror").hidden = false;
		$("#submiterror").html(html);
		return false;
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
	var totalCourses = courseLimitcheck(courses);
	
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
	var level;
	var gradterm;
	var gradtermtext;
	//var graderlist = [graderCourses];
	//var lablist = [labCourses];
	var major;
	var majortext;
	
	//get Current Level
	level = document.querySelector('input[name="level"]:checked').value;

	//get Major
	major = document.getElementById("major");
	majortext = major.options[major.selectedIndex].value;

	//get Graduating Semester
	gradterm = document.getElementById("grad");
	gradtermtext = gradterm.options[gradterm.selectedIndex].text;

	//get grader courses
	//if(courseChecked('grader'))
		//graderlist = writeCourses('grader', graderCourses);
	
	//get lab courses
	//if(courseChecked('lab'))
		//lablist = writeCourses('lab', labCourses)
	
	//writeData(level, gradtermtext, graderlist, lablist);
	//writeData(level, majortext, gradtermtext);
	
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