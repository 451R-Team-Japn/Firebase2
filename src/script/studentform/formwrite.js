var anyavailable = false;
var GTA;

function updateGTA(g) {
	var GTAfile = document.getElementById("gf");
	var fhtml;
	GTA = parseInt(g);
	changeUpload(null);
	if(GTA != 0)
		makehidden('gtafilebtn', true);
	}
	if(GTA == 0){
		document.getElementById("lablist").hidden = false;
		document.getElementById("lablistna").hidden = true;
		fhtml = "Please attach your GTA certification or waiver, you may also attach your resume and/or transcript";
		//changeUpload('gtaf');
		GTAfile.setAttribute('required', '');
		makehidden('gtafilebtn', false);
	}
	else if(GTA == 2){
		document.getElementById("lablist").hidden = false;
		document.getElementById("lablistna").hidden = true;
	}
	else if(GTA == 1){
		document.getElementById("lablist").hidden = true;
		document.getElementById("lablistna").hidden = false;
		removeChecked('lab');
		fhtml = "You may attach your updated resume and transcript";
		GTAfile.removeAttribute('required');
	}
	else if(GTA == 3){
		document.getElementById("lablist").hidden = true;
		document.getElementById("lablistna").hidden = true;
		removeChecked('lab');
		fhtml = "You may attach your updated resume and transcript";
		GTAfile.removeAttribute('required');
	}
	else
		alert("addoptions() error");
		
	$("#uploadtext").html(fhtml);
	
	validateCourses();
}
function removeChecked(classname){
	//var list = document.querySelector('input[class="courses"]:checked');
	var list = document.getElementsByClassName(classname);
	//console.log(list);
	for(var j=0; j<list.length; ++j){ 
		//console.log(list[j]);
		list[j].checked = false;
		validateCourses();
	}
}
function setremovehidden(set, classname){
	var list = document.getElementsByClassName(classname);
	removeChecked(classname);
	//console.log(list);
	for(var j=0; list[j]; ++j){
		if(set){
			if(!list[j].checked)
				list[j].hidden = true;
		} else {
			list[j].hidden = false;
		}
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
function getCurrentterm(){
	const d = new Date();
	let month = d.getMonth()+1;
	var term;
	
	if(month>=8)
		term = 0;
	else if(month<=5)
		term = 1;
	else 
		term = 2;
	
	return term;
}
function changeUpload(value){
	var gta = $('input[name="GTA"]:checked').val();
	var r = 'resumefile';
	var t = 'transcriptfile';
	var g;
	
	if(gta == 0)
		g = 'gtafile';
	else
		g = null;
	
	if(value=="resumef"){
		makehidden(r, false);
		makehidden(t, true);
		makehidden(g, true);
	}
	else if(value=="transcriptf"){
		makehidden(r, true);
		makehidden(t, false);
		makehidden(g, true);
	}
	else if(value=="gtafile"){
		makehidden(r, true);
		makehidden(t, true);
		makehidden(g, false);
	}
}

function makehidden(classname, set){
	var list = document.getElementsByClassName(classname);
	//console.log(list);
	for(var j=0; list[j]; ++j){
		if(set){
			list[j].hidden = true;
		} else {
			list[j].hidden = false;
		}
	}
	//$(list).each(function(item){
		//item.hidden = set;
	//});
}


