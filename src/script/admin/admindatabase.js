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
	writeCourseIDs();
});

$('#application').submit(async function(){

})
$('.gtainput').click(function(){

})

$('.level').click(function(){

})
async function writeCourseIDs() {
	var GraderCourses = await getCollection('GraderCourses2');
	GraderCourses.forEach((Graderdoc) => {
		// doc.data() is never undefined for query doc snapshots
		//console.log(Graderdoc.id, " => ", Graderdoc.data());
		cloneCard(Graderdoc.id,Graderdoc.data(),'Grader');
		
	});
	var InstructorCourses = await getCollection('InstructorCourses2');
	InstructorCourses.forEach((Instructordoc) => {
		// doc.data() is never undefined for query doc snapshots
		//console.log(Instructordoc.id, " => ", Instructordoc.data());
		cloneCard(Instructordoc.id,Instructordoc.data(),'Instructor');
	});
	//await console.log(GraderCourses);
	//await console.log(InstructorCourses);
	
}
async function cloneCard(name,data,position) {
	const node = document.getElementById("card");
	const clone = node.cloneNode(true);
	var id;
	//var data=[{"id":"one", "Class":"CS 490", "Position": "Grader" , "Notes": "ghuewfjiewfjimefw", "Button":"index.html" },{"id":"two", "Class": "CS 449" , "Position": "Grader" , "Notes": "gfeg", "Button":"index.html" },{"id":"three", "Class": "CS 404" , "Position": "Grader" , "Notes": "egegeg", "Button":"index.html" },{"id":"four", "Class": "CS 303" , "Position": "Grader" , "Notes": "eggege", "Button":"index.html" },{"id":"five", "Class": "CS 451R" , "Position": "Grader" , "Notes": "egegegeg", "Button":"index.html" }];
	//var classes=["CS 490","CS 449","CS 404","CS 303","CS 451R"];
	var g;

	g = document.createElement('div');
	g.setAttribute("id", name);
	
	document.getElementById('open-position-container').appendChild(g);
	
	document.getElementById(name).appendChild(clone);			
	classname=await'#'+name+' #classname'; 
	position=await'#'+name+' #position'; 
	notes=await'#'+name+' #notes'; 
	button=await'#'+name+' #button'; 
	$(classname).html(await data.CourseType+' '+data.CourseNumber);
	$(position).html(position);
	$(notes).html(await data.Notes);
	$(button).attr(await "value", name);

	console.log(document.getElementById('open-position-container').innerHTML);
}
async function addLaboptions() {
	var data = await sort('InstructorCourses2');

}
// Get a list of courses from your database
async function getCollection(colName){
  const docRef = collection(db, colName);
  const q = query(docRef, orderBy("CourseNumber", "asc"));
  
  const querySnapshot = await getDocs(q);
  
  /*querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  });*/
  
  return querySnapshot;
}
async function sort(colName){
  const docRef = collection(db, colName);
  const q = query(docRef, orderBy("CourseNumber", "asc"));
  
  const querySnapshot = await getDocs(q);
  //console.log(querySnapshot);
  
  /*querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  });*/
  
  return querySnapshot;
	
  //const col = collection(db, colName);
  //const snapshot = await getDocs(col);
  //const list = snapshot.docs.map(doc => doc.data());
  //console.log(q);
  //return list;
}
async function getCollectionID(colName) {
const col = collection(db, colName);
  const snapshot = await getDocs(col);
  const list = snapshot.docs.map(doc => doc.id);
  return list;
}

// Detect auth state
//auth.onAuthStateChanged(user => {

//});
onAuthStateChanged(auth, user => {
  if(user != null){
	console.log('logged in!');
  } else {
	console.log('No user');
  }
});

