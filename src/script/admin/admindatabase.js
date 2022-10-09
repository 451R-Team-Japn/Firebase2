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
async function writeCourses(Courses,Position) {
	await writeCourseIDs('GraderCourses2','Grader');
	await writeCourseIDs('InstructorCourses2','Instructor');
	document.getElementById("card").hidden = true;
}
async function writeCourseIDs(Courses,Position) {
	console.log(Courses, " => ", Position);
	var Courses = await getCollection(Courses, 'CourseNumber', 'asc');
	Courses.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		//console.log(Instructordoc.id, " => ", Instructordoc.data());
		cloneCard(doc.id,doc.data(),Position);
	});
	
}
async function cloneCard(name,data,positionname) {
	const node = document.getElementById("card");
	const clone = node.cloneNode(true);
	var id;
	var g;
	var semester=["Fall","Spring","Summer"]
	var grad;
	
	if(data.GradCourse)
		grad = "grad";
	else
		grad = "undergrad";
	
	g = document.createElement('div');
	await g.setAttribute("id", name);
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
	var seebutton=await'#'+name+' #seebutton'; 
	var editbutton=await'#'+name+' #editbutton'; 
	$(classname).html(await data.CourseType+' '+data.CourseNumber);
	$(position).html(positionname);
	$(notes).html(await data.Notes);
	$(semesterclass).html(await semester[data.Semester]);
	$(seebutton).attr(await "value", name);
	$(editbutton).attr(await "value", name);

	console.log(document.getElementById('open-position-container').innerHTML);
}
// Get a list of courses from your database
async function getCollection(colName,index,d){
  const docRef = collection(db, colName);
  const q = query(docRef, orderBy(index, d));
  
  const querySnapshot = await getDocs(q);
  
  /*querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  });*/
  
  return querySnapshot;
}
async function sort(colName,index,order){
  const docRef = collection(db, colName);
  const q = query(docRef, orderBy(index, order));
  
  const querySnapshot = await getDocs(q);
  
  /*querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  });*/
  
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

