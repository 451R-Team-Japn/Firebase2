import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { getFirestore, doc, collection, setDoc, updateDoc, getDocs, getDoc, query, where, orderBy, limit } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';

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
var currentCourse = location.search.substring(1);

$(document).ready(function () { 
	if(currentCourse != "" || currentCourse !=  'new'){
		getCourse();
	}
});
async function getCourse(){
	var docSnap=await getCoursedoc('Courses',currentCourse);
	var courseObj;

	courseObj= await docSnap.data();
	console.log(courseObj);
	
	await writeData(courseObj);
	await changeModal(courseObj);
}
async function getCoursedoc(colName, docName) {
	const docRef = doc(db, colName, docName);
	const docSnap = await getDoc(docRef);
	
	return docSnap;
}
$('#courseform').submit(function(){
	var form = $("#courseform");
	if(form[0].checkValidity() === true){
		console.log("submit");
		submitform();
	}
	else{
		event.preventDefault();
	}
	
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
			if(currentCourse != "" || currentCourse !=  'new')
				await setDoc(doc(db, "Courses", id), course);
			else
				await updateDoc(doc(db, "Courses", id), course);
	});
	
}

