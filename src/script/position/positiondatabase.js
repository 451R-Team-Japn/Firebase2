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
var currentCourse = location.search.substring(1);

$(document).ready(function () { 
	if(currentCourse != "" || currentCourse !=  'new')
		getCourse();
});
async function getCourse(){
	var docSnap=await getCoursedoc('Courses',currentCourse);
	var courseObj;

	courseObj=docSnap.data();
	console.log(courseObj);
	
	//writeTitle(courseObj);
	await writeData(courseObj);
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
function writeData(course){
	document.getElementById("title").innerHTML = "Edit " + course.CourseType+" "+ course.CourseNumber + ": ";
	
	if(course.GradCourse)
		document.getElementById("level").value = "MS";
	else
		document.getElementById("level").value = "BS";
	document.getElementById("level").disabled = true;
	
	document.getElementById("CourseType").value = course.CourseType;
	document.getElementById("CourseType").disabled = true;
	
	document.getElementById("CourseNumber").value = course.CourseNumber;
	document.getElementById("CourseNumber").readOnly = true;
	
	document.getElementById("position").value = course.GraderOrLab;
	document.getElementById("position").disabled = true;
	
	document.getElementById("semester").checked = course.Semester;
	document.getElementById("semester").disabled = true;
	
	document.getElementById("notes").value = course.Notes;
}
$('#courseform').submit(function(){
	var form = $("#courseform");
	if(form[0].checkValidity() === true){
		console.log("submit");
		submitform();
		event.preventDefault();
	}
	else{
		event.preventDefault();
	}
	
})
$('.gtainput').click(function(){

})
async function submitform() {
	var position = document.getElementById("position").value;
	var semester = document.querySelectorAll('input[name="semester"]:checked');
	var semesters=[];
	var id;
	var course = await getData();
	semester.forEach(async function(item){
		course.Semester=parseInt(item.id);
		console.log(course.Semester);
		id=course.CourseType+course.CourseNumber+course.Semester+course.GraderOrLab;
		console.log(position);
		//if(position=="Grader")
		await setDoc(doc(db, "Courses", id), course);
		//else //if(position=="Instructor")
			//await setDoc(doc(db, "InstructorCourses2", id), course);
		/*else{
			console.log("GraderCourses2");
			await setDoc(doc(db, "GraderCourses2", id+"G"), course);
			await setTimeout(5000);
			console.log("InstructorCourses2");
			await setDoc(doc(db, "InstructorCourses2", id+"L"), course);
		}*/
	});
	
}

// Get a list of courses from your database
async function getCollection(colName) {
  const col = collection(db, colName);
  const snapshot = await getDocs(col);
  const list = snapshot.docs.map(doc => doc.data());
  return list;
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

