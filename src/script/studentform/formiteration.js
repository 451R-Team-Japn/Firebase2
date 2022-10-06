/*import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { getFirestore, collection, getDocs, getDoc } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';
//import { adminLogin, studentLogin } from "./login/login.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaA2hizfwgh6yIAOjuuuk64RgbOhMCQ5Y",
  authDomain: "japn-a71a1.firebaseapp.com",
  databaseURL: "https://japn-a71a1-default-rtdb.firebaseio.com",
  projectId: "japn-a71a1",
  storageBucket: "japn-a71a1.appspot.com",
  messagingSenderId: "548787191288",
  appId: "1:548787191288:web:8ebb8e35019d7d669bea0d",
  measurementId: "G-SBPFK1G3YV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);*/

	//var currentuser;
	var data=users["users"];
	var current;
	var totalCoursesllowed = 5;
	
$(document).ready(function () { 
	//currentuser = await localStorage.getItem("ID");
	
	//getUser();
	//addGraderoptions();
	populateTerms();
	//populateFields();
	writeCourselimit();
});
/*async function getUser() {
	var currentuser = await localStorage.getItem("ID");
	await console.log(currentuser);
	var gtaradiobtn = document.getElementById("onrecord");
	for(var i=0;i<data.length;i++){
		current=data[i];
		if(currentuser==current.StudentKeyID)
			break;
	}
	if(current.GTA == 1){
		gtaradiobtn.checked = true;
		document.getElementById("BS").hidden = true;
		document.getElementById("BSlabel").hidden = true;
		document.getElementById("gta").value = "yes";
		addoptions('certified');
		document.getElementById("gta").hidden = true;
	}
}*/
function writeCourselimit() {
	var html="Courses (choose of up to "+totalCoursesllowed+"):";	
	$("#courseslegend").html(html);
}
function checklevel(level) {
	var gtaradiobtn = document.getElementById("null");

	if(level!="BS" && current.GTA == 0){
		document.getElementById("gta").hidden = false;
		gtaradiobtn.checked = false;
	}
	else if(current.GTA == 0){
		document.getElementById("gta").hidden = true;
		gtaradiobtn.checked = true;
		addoptions('null');
	}
	else if(current.GTA == 1)
		document.getElementById("gta").hidden = true;
	
}

/*function populateFields(){
	document.getElementById("fname").value = current.FirstName;
	document.getElementById("fname").readOnly = true;
	document.getElementById("lname").value = current.LastName;
	document.getElementById("lname").readOnly = true;
	document.getElementById("studentID").value = current.StudentID;
	document.getElementById("studentID").readOnly = true;
	document.getElementById("email").value = current.Email;
	document.getElementById("email").readOnly = true;
	
}*/

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

/*function addGraderoptions() {
	var html="";
	var data=courses["courses"];
	var graderdetails = data[0];
	var labdetails = data[1];
	
	html+="<label class='form-label' for='grader'>Grader Classes</label>";
	var graderclasses = graderdetails["CourseID"];
	var graderclassAvailable = graderdetails["Available"];
	html+=listclasses(graderclasses, graderdetails["Available"], "grader");
	html+="<br>";
	
	$("#graderlist").html(html);
}*/
