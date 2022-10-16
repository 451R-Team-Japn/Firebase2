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
	//document.getElementById("card").hidden = true;
	document.getElementById("sample").remove();
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
	var applicantcount=0;
	var applicantsbool;
	var applicantstext;
	var positionname;
	
	await writeApplicants(name);
	
	if(data.GraderOrLab=="G")
		positionname = "Grader";
	else
		positionname = "Instructor";
	
	if(data.GradCourse)
		grad = "grad";
	else
		grad = "undergrad";
	
	if(applicantcount!=0)
		applicantsbool = "applicants";
	else
		applicantsbool = "noapplicants";
	
	if(applicantcount==1)
		applicantstext=applicantcount.toString()+" Applicant";
	else
		applicantstext=applicantcount.toString()+" Applicants";
	
	g = document.createElement('div');
	await g.classList.add("col-sm-4");
	await g.setAttribute("id", name);
	await g.classList.add("all");
	await g.classList.add(data.CourseType);
	await g.classList.add(positionname);
	await g.classList.add(grad);
	await g.classList.add(semester[data.Semester]);
	await g.classList.add(applicantsbool);
	
	document.getElementById('open-position-container').appendChild(g);
	
	document.getElementById(name).appendChild(clone);
	var classname=await'#'+name+' #classname'; 
	var position=await'#'+name+' #position'; 
	var notes=await'#'+name+' #notes'; 
	var semesterclass=await'#'+name+' #semester';
	var seebutton=await'#'+name+' #seebutton'; 
	var editbutton=await'#'+name+' #editbutton';
	var closebutton=await'#'+name+' #closebutton';
	var applicants=await'#'+name+' #applicants'; 
	var collapseid=await'#'+name+' #title';
	var collapsecard=await'#'+name+' .card-body';
	$(classname).html(await data.CourseType+' '+data.CourseNumber);
	$(position).html(positionname);
	$(notes).html(await data.Notes);
	$(semesterclass).html(await semester[data.Semester]);
	$(seebutton).attr(await "href", "applicants.html?"+name);
	$(seebutton).attr(await "target", "_blank");
	$(editbutton).attr(await "href", "createposition.html?"+name);
	$(editbutton).attr(await "target", "_blank");
	$(closebutton).attr(await "value", name);
	$(applicants).html(applicantstext);
	$(collapseid).attr("data-bs-target","#collapse"+name);
	$(collapsecard).attr("id","collapse"+name);
	
	if(applicantcount==0)
		$(seebutton).prop("disabled",true);
	else
		$(seebutton).prop("disabled",false);

	filter();
	$('.collapse').collapse('show');
	await console.log(document.getElementById('open-position-container').innerHTML);

	async function writeApplicants(courseName) {
		var index=["Course1","Course2","Course3","Course4","Course5"];
	
		for(var j=0;j<index.length;j++){
			await getApplicantcount(courseName,index[j]);
		}
	}
	async function getApplicantcount(courseName,index){
		const q = query(collection(db, "Applicants"), where(index, "==", courseName));
  
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			applicantcount++;
		});
	}
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

