var anyavailable = false;

function addoptions(GTA) {
	var html="";
	var data=courses["courses"];
	var details;
	var j;
	var graderdetails = data[0];
	var labdetails = data[1];
	var fileinput = document.getElementById("myFile");
	let filehtml = document.getElementById("uploadtext").textContent;
	var fhtml;
	
	//alert(filehtml);
	
	html+="<label class='form-label' for='lab'>Lab Classes</label>";
	
	if(GTA == "yes"){
		var labclasses = labdetails["CourseID"];
		html+=listclasses(labclasses, labdetails["Available"], "lab");
		html+="<br>";
		fhtml = "Please attach your GTA certification or waiver, you may also attach your resume and/or transcript";
		fileinput.setAttribute('required', '');
	}
	else if(GTA == "certified"){
		var labclasses = labdetails["CourseID"];
		html+=listclasses(labclasses, labdetails["Available"], "lab");
		html+="<br>";
	}
	else if(GTA == "no"){
		html+='<p class="error">You must be GTA certified to work as a lab instructor. <a href="https://catalog.umkc.edu/general-graduate-academic-regulations-information/international-graduate-student-academic-regulations/">Click here</a> to learn more about GTA certification process.</p>';
		fhtml = "You may attach your updated resume and transcript";
		fileinput.removeAttribute('required');
	}
	else if(GTA == "null"){
		html="";
		fhtml = "You may attach your updated resume and transcript";
		fileinput.removeAttribute('required');
	}
	else
		alert("addoptions() error");
		
	$("#uploadtext").html(fhtml);
	$("#lablist").html(html);
	
	validateCourses();
}
function setTwoNumberDecimal() {
	var GPA = document.getElementById("GPA");
    GPA.value = parseFloat(GPA.value).toFixed(2);
}
/*function listclasses(list, availabilitylist, position) {
	anyavailable = false;
	var html="<table>" + "<tr>";
	var oldhtml;
	var j=0;
	var col = Math.ceil(list.length / 6);
	
	for(var i=0;i<list.length;i++){
		if(j==0)
			html+="<tr>";
		html+=addclass(list[i],col,availabilitylist[i], position);
		j++;
		if(j==col){
			j=0;
			html+="</tr>";
		}
	}
	html+="<table>"
	html+="</select>";
	
		
	if(!anyavailable)
		html='<p class="error">There are no ' + position + ' positions available at this time.</p>'
	
	validateCourses();

	return html;
	
}
function addclass(data,col,available,position){
	var html="";
	var positionandcourse = position+" "+data;
	if(available == "true"){
		anyavailable = true;
		html+="<td><input required onclick='validateCourses()' class='"+position+" courses form-check-input' type='checkbox' id='"+data+"' name='"+data+"' value='"+data+"'>" +"<label class='form-check-label' for='"+data+"'>"+data+"</label></td>";
	}

    return html;
}*/
function listclasses(list, position) {
	anyavailable = false;
	var html="<div class='courselist'>";
	var j=0;
	//var col =  Math.ceil(list.length / 8);
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
/*function listclasses(list, availabilitylist, position) {
	anyavailable = false;
	var html="<br>";
	var oldhtml;
	var j=0;
	var col = Math.ceil(list.length / 6);
	
	for(var i=0;i<list.length;i++){
		if(j==0){
			html+="<div class='controls span2'>";
		}
		html+=addclass(list[i],col,availabilitylist[i], position);
		j++;
		if(j==col){
			j=0;
			html+="</div>";
		}
	}
	//html+="<table>"
	//html+="</select>";
	
		
	if(!anyavailable)
		html='<p class="error">There are no ' + position + ' positions available at this time.</p>'
	
	validateCourses();

	return html;
	
}
function addclass(data,col,available,position){
	var html="";
	var positionandcourse = position+" "+data;
	if(available == "true"){
		anyavailable = true;
		html+="<label class='form-check-label checkbox' for='"+data+"'>"+"<input required onclick='validateCourses()' class='"+position+" courses form-check-input' type='checkbox' id='"+data+"' name='"+data+"' value='"+data+"'> "+data+"</label>";
	}

    return html;
}*/


