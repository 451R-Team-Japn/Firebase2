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
var GraderCourses;
var InstructorCourses;

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
	GraderCourses = await getCollectionID('GraderCourses2');
	InstructorCourses = await getCollectionID('InstructorCourses2');
	await console.log(GraderCourses);
	await console.log(InstructorCourses);
	
}
async function addLaboptions() {
	var data = await sort('InstructorCourses2');

}
// Get a list of courses from your database
async function getCollection(colName) {
  const col = collection(db, colName);
  const snapshot = await getDocs(col);
  const list = snapshot.docs.map(doc => doc.data());
  return list;
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

