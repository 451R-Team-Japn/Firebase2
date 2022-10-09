import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { getFirestore, doc, collection, setDoc, getDocs, getDoc, query, where, orderBy, limit } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';
//import { updateGTA } from './formwrite';

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
var currentCourse;
var courseObj;
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

$('.level').click(function(){

})
async function getCourse(){
	var position;
	var applicants = [];
	currentCourse = await localStorage.getItem("Course");
	var docSnap=await getCoursedoc('GraderCourses2',currentCourse);
	if (await docSnap.exists()) {
		position="Grader";
	} else {
		position="Instructor";
		docSnap=await getCoursedoc('InstructorCourses2',currentCourse);
	}
	courseObj=docSnap.data();
	console.log(courseObj);
	writeTitle(courseObj,position);
	applicants=await writeApplicants(currentCourse,applicants);
	console.log(applicants);
	await writeStudents(applicants);
	await document.getElementById("sortTable").deleteRow(1);
	$('#sortTable').DataTable().draw();
	//setFilters();
}
async function writeStudents(applicants) {
	var student;
	var application;
	for(var j=0;j<applicants.length;j++){
		student=await getCoursedoc('StudentAccounts',applicants[j]);
		application=await getCoursedoc('applicant',applicants[j]);
		writeTable(student.data(),application.data());
	}
}
async function writeTable(student,application) {
	console.log("add");
	
	var table = $('#sortTable').DataTable();
	
	var majortext = ["CS","IT","ECE","EE"];
	var leveltext = ["BS","MS","PhD"];

	
	//var row = table.insertRow(-1);
	var Namecell = student.FirstName+" "+student.LastName;
	var GPAcell = application.GPA;
	var Hourscell = application.Hours;
	var Levelcell = leveltext[application.CurrentLevel];
	var Majorcell = majortext[application.Major];
	var IDcell = student.StudentID;
	var Emailcell = student.Email;
	var Documentscell = "<button>Document</button>";
	
	table.row.add([Namecell,GPAcell,Hourscell,Levelcell,Majorcell,IDcell,Emailcell,Documentscell]).draw();
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
  const q = query(collection(db, "applicant"), where(index, "==", courseName));
  
  const querySnapshot = await getDocs(q);
  
  //var applicants = [];
  
  //console.log(index+" => "+querySnapshot);
  querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		console.log(index," => ",doc.id, " => ", doc.data());
		applicants[applicantcount] = doc.id;
		applicantcount++;
	});
  
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

onAuthStateChanged(auth, user => {
  if(user != null){
	console.log('logged in!');
  } else {
	console.log('No user');
  }
});

