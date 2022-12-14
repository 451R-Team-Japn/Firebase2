import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { getFirestore, doc, collection, deleteDoc, setDoc, getDocs, getDoc, query, where, orderBy, limit } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';

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

onAuthStateChanged(auth, (user) => {
	writeCourses();
});

async function writeCourses() {
	await writeCourseIDs('Courses');
	document.getElementById("sample").remove();
}
async function writeCourseIDs(coursescol) {
	var courses = await getCollection(coursescol, 'CourseNumber', 'asc');
	courses.forEach((doc) => {
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
	var link = "https://catalog.umkc.edu/search/?search=";
	
	if(data.CourseType == "CS")
		link+="COMP-SCI+";
	else if(data.CourseType == "IT")
		link+="INFO-TEC+";
	else if(data.CourseType == "ECE")
		link+="E%26C-ENGR+";
	
	link+=data.CourseNumber;
	
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
	var courselink=await'#'+name+' #link';
	
	$(classname).html(await data.CourseType+' '+data.CourseNumber);
	$(position).html(positionname);
	$(notes).html(notestext);
	$(semesterclass).html(await semester[data.Semester]);
	$(collapseid).attr("data-bs-target","#collapse"+name);
	$(collapsecard).attr("id","collapse"+name);
	$(courselink).attr("href",link);

	filter();
	
	$('.collapse').collapse('hide');
}
// Get a list of courses from your database
async function getCollection(colName,index,d){
	const docRef = collection(db, colName);
	const q = query(docRef, orderBy(index, d));
  
	const querySnapshot = await getDocs(q);
  
	return querySnapshot;
}