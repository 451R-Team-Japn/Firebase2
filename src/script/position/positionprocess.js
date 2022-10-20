function coursenumberChange(n) {
	document.getElementById("CourseNumber").value = n.toUpperCase();
}
function semesterValidation() {
	console.log("semesterValidation()");
	var checkboxes = document.getElementsByClassName('semester-option');
	var checked=$('div.checkbox-group.required :checkbox:checked').length > 0;
	
	console.log("checked => "+checked);
	
	if(checked)
		setremoveRequired(false, checkboxes);
	else
		setremoveRequired(true, checkboxes);
}

function setremoveRequired(set, list){	 
	for(var j=0; list[j]; ++j){
		if(set)
			list[j].setAttribute('required', '');
		else 
			list[j].removeAttribute('required');
	}
}

function changePattern(level){
	var coursenum = document.getElementById("CourseNumber");
	if(level=="BS")
		coursenum.pattern = "(([1-4][0-9]{2})([ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{1,2})?)";
	else
		coursenum.pattern = "(([5][0-9]{3})([ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{1,2})?)";
}
function changeModal(course) {
	document.getElementById("positionModalLabel").innerHTML = "Edit Position " + course.CourseType + " " + course.CourseNumber;
	document.getElementById("position-modal-body").innerHTML =  "The " + course.CourseType + " " + course.CourseNumber + " position was successfully edited!";
	$('#reload-button').hide();
}
function writeData(course){
	document.getElementById("title").innerHTML = "Edit Position " + course.CourseType + " " + course.CourseNumber;
	
	if(course.GradCourse)
		document.getElementById("level").value = "MS";
	else
		document.getElementById("level").value = "BS";
	
	document.getElementById("create-btn").value = "Edit";
		
	document.getElementById("level").disabled = true;
	
	document.getElementById("CourseType").value = course.CourseType;
	document.getElementById("CourseType").disabled = true;
	
	document.getElementById("CourseNumber").value = course.CourseNumber;
	document.getElementById("CourseNumber").readOnly = true;
	
	document.getElementById("position").value = course.GraderOrLab;
	document.getElementById("position").disabled = true;
	
	document.getElementById(course.Semester).checked = true;
	
	document.getElementById("notes").value = course.Notes;
	
	semesterValidation();
}
function getPagetype(){
	return 1;
}