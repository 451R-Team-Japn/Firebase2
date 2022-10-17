import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { getFirestore, doc, collection, setDoc, updateDoc, getDocs, getDoc, query, where, orderBy, limit } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';
import { getStorage, ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js';

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
const auth = getAuth(app);
const storage = getStorage();
var currentCourse = location.search.substring(1);
var applicantcount = 0;
var done = false;

$(document).ready(function () { 
	console.log("ready");
	getCourse();
});
$('#application').submit(async function(){

})
$('.gtainput').click(function(){

})
$(document).on('click','.remove',function(event){
	var value = event.target.value;
	alert(currentCourse+" => "+value);
});

$(document).on('change','.gtaselect',function(event){
	var value = parseInt(event.target.value);
	var student = event.target.getAttribute("student");
	//alert(student+" => "+value);
	updateGTA(student, value);
});
$(document).on('change','#pdfbtn',async function(event){
	var value = event.target.value+".pdf";
	var student = event.target.getAttribute("student");
	event.target.value = "documents";
	//alert(student+" => "+value);
	await writeFile(student, value);
	modal();
});

async function getCourse(){
	var table = $('#sortTable').DataTable();
	var position;
	var courseObj;	
	var applicants = [];
	//currentCourse = await localStorage.getItem("Course");
	var docSnap=await getCoursedoc('Courses',currentCourse);
	position="Grader";
	/*if (await docSnap.exists()) {
		position="Grader";
	} else {
		position="Instructor";
		docSnap=await getCoursedoc('InstructorCourses2',currentCourse);
	}*/
	courseObj=docSnap.data();
	console.log(courseObj);
	
		
	if(courseObj.GraderOrLab=="G"){
		position="Grader";
		table.column(7).visible(false);
	}
	else 
		position="Instructor";

	writeTitle(courseObj,position);
	applicants=await writeApplicants(currentCourse,applicants);
	console.log(applicants);
	await writeStudents(applicants, position);

	
	//await document.getElementById("sortTable").deleteRow(1);
	table.draw();
	//setFilters();
}
async function writeStudents(applicants, position) {
	var student;
	var application;
	for(var j=0;j<applicants.length;j++){
		student=await getCoursedoc('AccountStudent',applicants[j]);
		application=await getCoursedoc('Applicants',applicants[j]);
		writeTable(student,application.data(),position);
	}
}
async function writeTable(student,application,position) {
	var table = $('#sortTable').DataTable();
	var studentdata=student.data();
	var x = document.createElement('button');
	var gtaselect =  document.createElement('select');
	var docbtn = document.createElement('select');
	var filesexist = false;
	var majortext = ["CS","IT","ECE","EE"];
	var leveltext = ["BS","MS","PhD"];
	
	console.log("add");
	
	getGTAselect();
	filesexist = getDocbtn();
	
	//var docbtn = '<button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Documents</button><div class="dropdown-menu">';
	
	x.classList.add("remove");
	x.setAttribute("value", student.id);
	
	//document.getElementById("Mobility").selectedIndex = 12; //Option 10

	
	//var row = table.insertRow(-1);
	var Namecell = studentdata.FirstName+" "+studentdata.LastName;
	var GPAcell = application.GPA;
	var Hourscell = application.Hours;
	var Levelcell = leveltext[application.CurrentLevel];
	var Majorcell = majortext[studentdata.Major];
	var IDcell = studentdata.StudentID;
	var Emailcell = studentdata.Email;
	var GTAcell = "<div id='"+student.id+"gpa'></div>";
	var Documentscell = "<div id='"+student.id+"doc'></div>";
	var removecell = "<button type='button' class='btn btn-primary remove' value='"+student.id+"'>X</button>";
	
	table.row.add([IDcell,Namecell,Emailcell,Levelcell,Majorcell,GPAcell,Hourscell,GTAcell,Documentscell,removecell]).draw();
	
	if(position == "Instructor")
		document.getElementById(student.id+"gpa").appendChild(gtaselect);	
		
	console.log("filesexist",filesexist);
	if(filesexist)
		document.getElementById(student.id+"doc").appendChild(docbtn);
	else
		document.getElementById(student.id+"doc").innerHTML = "No Documents";
	
	console.log(removecell);
	
	async function getDocbtn(){
		var opt;
		var docexist = false;
		
		//docbtn.classList.add("pdfbtn");
		docbtn.setAttribute("id", "pdfbtn");
		docbtn.classList.add("btn"); 
		docbtn.classList.add("btn-primary");
		docbtn.setAttribute("student", student.id);
		
		opt = document.createElement('option');
		opt.value = "documents";
		opt.innerHTML = "Documents";
		opt.setAttribute("disabled", true);
		opt.setAttribute("hidden", true);
		opt.setAttribute("selected", true);
		docbtn.appendChild(opt);
		
		if(await getFile(student.id, 'resume')){
			docexist = true;
			opt = document.createElement('option');
			opt.value = "resume";
			opt.innerHTML = "Resume";
			docbtn.appendChild(opt);
		}
		
		if(await getFile(student.id, 'transcript')){
			docexist = true;
			opt = document.createElement('option');
			opt.value = "transcript";
			opt.innerHTML = "Transcript";
			docbtn.appendChild(opt);
		}
		
		if(position == "Instructor" && await getFile(student.id, 'gta')){
			docexist = true;
			opt = document.createElement('option');
			opt.value = "gta";
			opt.innerHTML = "GTA";
			docbtn.appendChild(opt);
		}
		
		return docexist;
	
	}
	async function getGTAselect(){
		var opt;
		var GTAtext = ["Not Available","Pending","Certified"];
		
		gtaselect.classList.add("gtaselect");
		gtaselect.classList.add("btn"); 
		gtaselect.classList.add("btn-primary");
		
		for (var i = 0; i<GTAtext.length; i++){
			opt = document.createElement('option');
			opt.value = i;
			opt.setAttribute("id", student.id);
			opt.innerHTML = GTAtext[i];
			gtaselect.appendChild(opt);
		}
		
		gtaselect.selectedIndex = studentdata.GTACertified;
		gtaselect.setAttribute("student", student.id);		
	}
}
async function writeApplicants(courseName,applicants) {
	var index=["Course1","Course2","Course3","Course4","Course5"];
	
	for(var j=0;j<index.length;j++){
		applicants=await queryCourse(courseName,index[j],applicants);
	}
	return applicants;
}
async function writeTitle(course,positionname) {
	$(classname).html(await course.CourseType+' '+course.CourseNumber);
	$(position).html(positionname);	
}
async function queryCourse(courseName,index,applicants){
  const q = query(collection(db, "Applicants"), where(index, "==", courseName));
  
  const querySnapshot = await getDocs(q);
  
  //var applicants = [];
  
  //console.log(index+" => "+querySnapshot);
  querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		console.log(index," => ",doc.id, " => ", doc.data());
		applicants[applicantcount] = doc.id;
		applicantcount++;
	});
	
	console.log(applicantcount);
  
	console.log(applicants);
  
	return applicants;
}
async function getCoursedoc(colName, docName) {
	const docRef = doc(db, colName, docName);
	const docSnap = await getDoc(docRef);
	
	return docSnap;

	/*if (docSnap.exists()) {
		console.log("Document data:", docSnap.data());
	} else {
		// doc.data() will be undefined in this case
		console.log("No such document!");
	}*/
}
async function updateGTA(docName, value) {
	const docRef = doc(db, 'AccountStudent', docName);
	await updateDoc(docRef, {
		"GTACertified": value
	});
}

async function writeFile(id, filename) {
	var storageRef = ref(storage, id+'/'+filename);
	var iframe1 = document.getElementById('iframepdf');
	await getDownloadURL(storageRef).then(onResolve, onReject);
	async function onResolve(url) {
		console.log(url);
		iframe1.src = await url;
	}
	function onReject(error) {
		console.log("error",error);
		iframe1.src = "files/error.jpg";
	}
}
async function getFile(id, filename) {
	var storageRef = ref(storage, id+'/'+filename+'.pdf');
	var value;
	value = await getDownloadURL(storageRef).then(onResolve, onReject);
	function onResolve() {
		return true;
	}
	function onReject() {
		return false;
	}
	console.log(value);
	return value;
}

onAuthStateChanged(auth, user => {
  if(user != null){
	console.log('logged in!');
  } else {
	console.log('No user');
  }
});

