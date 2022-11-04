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
	getCourses();
});

async function getCourses() {
	await writeCourses('Courses');
	document.getElementById("sample").remove();
}

async function writeCourses(coursescol) {
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
	$(editbutton).attr(await "href", "createposition.html?"+name);
	$(closebutton).attr(await "value", name);
	$(closebutton).attr(await "name", data.CourseType+' '+data.CourseNumber+' ('+semester[data.Semester]+')');
	//$(closebutton).attr(await "semester", semester[data.Semester]);
	$(applicants).html(applicantstext);
	$(collapseid).attr("data-bs-target","#collapse"+name);
	$(collapsecard).attr("id","collapse"+name);
	
	if(applicantcount==0)
		$(seebutton).prop("disabled",true);
	else
		$(seebutton).prop("disabled",false);

	filter();
	
	$('.collapse').collapse('show');

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

$(document).on("click", "#closebutton", async function() {
	var value = $(this).attr("value");
	var name = $(this).attr("name");
	
	$("#course-remove-title").html(name);
	$("#course-remove-body").html(name);
	
	custom_confirm(value);
});

function custom_confirm(value) {
 //  show modal ringer custom confirmation
  $('#adminModal').modal('show');

  $('#adminModal button.ok').off().on('click', function() {
     // close window
     $('#adminModal').modal('hide');

     removeCourse(value);
  });
}

async function removeCourse(coursevalue){
	var card='#'+coursevalue; 
	await deleteDoc(doc(db, "Courses", coursevalue));
	$(card).fadeOut();
}

// Get a list of courses from your database
async function getCollection(colName,index,d){
  const docRef = collection(db, colName);
  const q = query(docRef, orderBy(index, d));
  
  const querySnapshot = await getDocs(q);
  
  return querySnapshot;
}