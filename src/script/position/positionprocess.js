$(document).ready(function () { 

});
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
	//var courseinput = document.getElementById("courseinput");
	 
	for(var j=0; list[j]; ++j){
		if(set){
			list[j].setAttribute('required', '');
			//courseinput.setAttribute("class", "input-group is-invalid");
		} else {
			list[j].removeAttribute('required');
			//courseinput.removeAttribute("class");
		}
	}
}
function changePattern(level){
	var coursenum = document.getElementById("CourseNumber");
	if(level=="BS")
		coursenum.pattern = "(([1-4][0-9]{2})([ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{1,2})?)";
	else
		coursenum.pattern = "(([5][0-9]{3})([ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{1,2})?)";
}
function getPagetype(){
	return 1;
}