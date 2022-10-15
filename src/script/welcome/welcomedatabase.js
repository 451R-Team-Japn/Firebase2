import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { getFirestore, doc, collection, deleteDoc, setDoc, getDocs, getDoc, query, where, orderBy, limit } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';
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
//var GraderCourses;
//var InstructorCourses;

$(document).ready(function () { 
	console.log("ready");
	writeCourses();
});

$('#application').submit(async function(){

})
$('.gtainput').click(function(){

})

$('.level').click(function(){

})
async function writeCourses() {
	await writeCourseIDs('Courses');
	//await writeCourseIDs('InstructorCourses2','Instructor');
	document.getElementById("card").hidden = true;
	await console.log(document.getElementById('open-position-container').innerHTML);
}
async function writeCourseIDs(Courses) {
	//console.log(Courses, " => ", Position);
	var Courses = await getCollection(Courses, 'CourseNumber', 'asc');
	Courses.forEach((doc) => {
		cloneCard(doc.id,doc.data());
	});
	
}
async function cloneCard(name,data) {
	const node = document.getElementById("card");
	const clone = node.cloneNode(true);
	var id;
	var g;
	var semester=["Fall","Spring","Summer"]
	var grad;
	var notestext;
	var positionname;
	
	if(data.GraderOrLab=="G"){
		positionname = "Grader";
		notestext = "Anyone can apply for this class if they <b>taken it at UMKC</b> or are a <b>PhD</b> student.";
	}
	else{
		positionname = "Instructor";
		notestext = "This is an <b>instructor</b> course to apply for this you must be a <b>graduate</b> student and be <b>GTA certified.</b> To learn more about <b>GTA certification</b><a href='https://catalog.umkc.edu/general-graduate-academic-regulations-information/international-graduate-student-academic-regulations/' target='_blank'> click here</a>."
	}
	
	if(data.GradCourse){
		grad = "grad";
		if(positionname == "Grader")
			notestext = "You may only apply for course if you <b>taken it at UMKC</b> with a <b>satisfactory grade</b> of an <b>A, A-, or B+</b> or are a <b>PhD</b> student."
	}
	else{
		grad = "undergrad";
	}
	
	g = document.createElement('div');
	await g.classList.add("col-sm-3");
	await g.setAttribute("id", name);
	await g.classList.add("all");
	await g.classList.add(data.CourseType);
	await g.classList.add(positionname);
	await g.classList.add(grad);
	await g.classList.add(semester[data.Semester]);
	
	document.getElementById('open-position-container').appendChild(g);
	
	document.getElementById(name).appendChild(clone);
	var classname=await'#'+name+' #classname'; 
	var position=await'#'+name+' #position';
	var notes=await'#'+name+' #notes';  
	var semesterclass=await'#'+name+' #semester';
	var collapseid=await'#'+name+' #title';
	var collapsecard=await'#'+name+' .card-body';
	$(classname).html(await data.CourseType+' '+data.CourseNumber);
	$(position).html(positionname);
	$(notes).html(notestext);
	$(semesterclass).html(await semester[data.Semester]);
	$(collapseid).attr("data-bs-target","#collapse"+name);
	$(collapsecard).attr("id","collapse"+name);

	filter();
	$('.collapse').collapse('hide');
	await console.log(document.getElementById('open-position-container').innerHTML);
}
$(document).on("click", "#closebutton" ,async function() {
	var value = $(this).attr("value");
	console.log(value);
	var card=await'#'+value; 
	await deleteDoc(doc(db, "Courses", value));
	$(card).prop("hidden",true);
});
/*async function closeCourse(course){
	await deleteDoc(doc(db, "GraderCourses2", course));
	await deleteDoc(doc(db, "InstructorCourses2", course));
}*/
// Get a list of courses from your database
async function getCollection(colName,index,d){
  const docRef = collection(db, colName);
  const q = query(docRef, orderBy(index, d));
  
  const querySnapshot = await getDocs(q);
  
  return querySnapshot;
}
async function sort(colName,index,order){
  const docRef = collection(db, colName);
  const q = query(docRef, orderBy(index, order));
  
  const querySnapshot = await getDocs(q);

  return querySnapshot;
}
async function getCollectionID(colName) {
const col = collection(db, colName);
  const snapshot = await getDocs(col);
  const list = snapshot.docs.map(doc => doc.id);
  return list;
}

onAuthStateChanged(auth, user => {
  if(user != null){
	console.log('logged in!');
  } else {
	console.log('No user');
  }
});

