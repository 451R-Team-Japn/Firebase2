var anyavailable = false;

function updateGTA(GTA) {
	var fileinput = document.getElementById("myFile");
	var fhtml;
	
	if(GTA == "yes"){
		document.getElementById("lablist").hidden = false;
		document.getElementById("lablistna").hidden = true;
		fhtml = "Please attach your GTA certification or waiver, you may also attach your resume and/or transcript";
		fileinput.setAttribute('required', '');
	}
	else if(GTA == "certified"){
		document.getElementById("lablist").hidden = false;
		document.getElementById("lablistna").hidden = true;
	}
	else if(GTA == "no"){
		document.getElementById("lablist").hidden = true;
		document.getElementById("lablistna").hidden = false;
		removeChecked();
		fhtml = "You may attach your updated resume and transcript";
		fileinput.removeAttribute('required');
	}
	else if(GTA == "null"){
		document.getElementById("lablist").hidden = true;
		document.getElementById("lablistna").hidden = true;
		removeChecked();
		fhtml = "You may attach your updated resume and transcript";
		fileinput.removeAttribute('required');
	}
	else
		alert("addoptions() error");
		
	$("#uploadtext").html(fhtml);
	
	validateCourses();
}
function removeChecked(){
	//var list = document.querySelector('input[class="courses"]:checked');
	var list = document.getElementsByClassName("lab");
	//console.log(list);
	for(var j=0; j<list.length; ++j){ 
		//console.log(list[j]);
		list[j].checked = false;
		validateCourses();
	}
}
function setTwoNumberDecimal() {
	var GPA = document.getElementById("GPA");
    GPA.value = parseFloat(GPA.value).toFixed(2);
}
function listclasses(list, position) {
	anyavailable = false;
	var html="<div class='courselist'>";
	var j=0;
	var col =  7;
	
	for(var i=0;i<list.length;i++){
		html+="<div class='form-check form-check-inline'>";
		html+=addclass(list[i], col, position);
		html+="</div>";
		j++;
		if(j==col){
			j=0;
			html+="<br>";
		}
	}
	html+="</div>"
	//html+="</select>";
	
		
	if(!anyavailable)
		html='<p class="error">There are no ' + position + ' positions available at this time.</p>'
	
	validateCourses();

	return html;
	
}
function addclass(data,col,position){
	console.log(data.CourseNumber);
	console.log(data.CourseType);
	var html="";
	var positionandcourse = position+" "+data;
	if(available == "true"){
		anyavailable = true;
		html+="<input required onclick='validateCourses()' class='"+position+" courses form-check-input' type='checkbox' id='"+data+"' name='"+data+"' value='"+data+"'>" +"<label class='form-check-label' for='"+data+"'>"+data+"</label>";
	}

    return html;
}


