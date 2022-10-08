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
	currentCourse = await localStorage.getItem("Course");
	courseObj=getCoursedoc('GraderCourses2',currentCourse);
	if (!courseObj.exists()) {
		position="Instructor";
		courseObj=getCoursedoc('InstructorCourses2',currentCourse);
	} else {
		position="Grader";
	}
	console.log(courseObj);
	writeTitle(courseObj,position);
}
async function writeTitle(course,positionname) {
	$(classname).html(await course.CourseType+' '+course.CourseNumber);
	$(position).html(positionname);	
}
async function sort(colName,index,d){
  const docRef = collection(db, colName);
  const q = query(docRef, orderBy(index, d));
  
  const querySnapshot = await getDocs(q);
  
  return querySnapshot;
}
async function getCoursedoc(colName, docName) {
	const docRef = doc(db, colName, docName);
	const docSnap = await getDoc(docRef);
	
	return docSnap;

	if (docSnap.exists()) {
		console.log("Document data:", docSnap.data());
	} else {
		// doc.data() will be undefined in this case
		console.log("No such document!");
	}
}

onAuthStateChanged(auth, user => {
  if(user != null){
	console.log('logged in!');
  } else {
	console.log('No user');
  }
});

