import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { getFirestore, doc, collection, setDoc, updateDoc, getDocs, getDoc, query, where, orderBy, limit } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';
import { getStorage, ref, uploadBytes } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js';

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
const storage = getStorage();
var currentuser;
var currentcertified;
var user;


$(document).ready(function () { 
	var term = getCurrentterm();
	console.log(term);
	if(getAccounttype() == "AccountStudent")
		getUser();
	else{
		setremovehidden(true, 'grad');
		currentcertified = 0;
		document.getElementById("form-submit").disabled  = true;
	}
	
	$("input[name=applyterm][value="+term.toString()+"]").attr('checked', true);
	addGraderoptions(term);
	addLaboptions(term);
});
$(document).on("click", ".applyterm" ,async function() {
	var value = parseInt($(this).attr("value"));
	addGraderoptions(value);
	addLaboptions(value);
});

$('#application').submit(async function(){
	var applicant;
	var files;
	
	if(!submitForm())
		event.preventDefault();
	else{
		applicant=getData();
		//await setDoc(doc(db, "Applicants", currentuser), applicant);
		user=updateUser();
		await updateDoc(doc(db, "AccountStudent", currentuser), user);
		
		files=getFiles();
		
		if(files.Resume.File !== undefined)
			uploadFile(currentuser, files.Resume.Name, files.Resume.File);
		if(files.Transcript.File !== undefined)
			uploadFile(currentuser, files.Transcript.Name, files.Transcript.File);
		if(files.GTA.File !== undefined)
			uploadFile(currentuser, files.GTA.Name, files.GTA.File);
		
	}
})
async function getUser() {
	currentuser = await sessionStorage.getItem("ID");
	const docRef = doc(db, "AccountStudent", currentuser);
	const docSnap = await getDoc(docRef);
	user = docSnap.data();
	var gtaradiobtn = document.getElementById("onrecord");
	var gtaradiosecbtn = document.getElementById("pending");
	
	currentcertified = user.GTACertified;
	
	if(currentcertified > 0){
		if(currentcertified == 1)
			gtaradiosecbtn.checked = true;
		if(currentcertified == 2)
			gtaradiobtn.checked = true;
		document.getElementById("BS").hidden = true;
		document.getElementById("BSlabel").hidden = true;
		document.getElementById("gta").value = "yes";
		updateGTA(2);
		document.getElementById("gta").hidden = true;
	}
	else{
		setremovehidden(true, 'grad');
	}
	populateFields();
}
function populateFields(){
	var level = document.querySelectorAll('input[name="level"]');
	var levelval = user.CurrentLevel.toString();
	
	console.log(levelval);
	
	document.getElementById("fname").value = user.FirstName;
	document.getElementById("fname").readOnly = true;
	document.getElementById("lname").value = user.LastName;
	document.getElementById("lname").readOnly = true;
	document.getElementById("studentID").value = user.StudentID;
	document.getElementById("studentID").readOnly = true;
	document.getElementById("email").value = user.Email;
	document.getElementById("email").readOnly = true;
	document.getElementById("major").value = user.Major;
	
	for(var i=0;i<level.length;i++){
		console.log(level[i].value);
		if(level[i].value == levelval)
			level[i].checked = true;
	}
	updateLevel();
}
$('.level').click(function(){
	updateLevel();
})
function updateLevel() {
	var level = document.querySelector('input[name="level"]:checked').value;
	var gtaradiobtn = document.getElementById("null");

	if(level==0){
		setremovehidden(true, 'grad');
		gtaradiobtn.checked = false;
	}
	else{
		setremovehidden(false, 'grad');
	}
	if(level!=0 && currentcertified == 0){
		document.getElementById("gta").hidden = false;
		gtaradiobtn.checked = false;
	}
	else if(currentcertified == 0){
		document.getElementById("gta").hidden = true;
		gtaradiobtn.checked = true;
		updateGTA(3);
	}
	else if(currentcertified >= 0){
		document.getElementById("gta").hidden = true;
		makehidden('gtafilebtn', true);
	}
}
async function addGraderoptions(semester) {
	var data = await querysemester('G', semester);

	var html="";
	
	html+="<label class='form-label' for='grader'>Grader Classes</label>";
	html+= await listclasses(data, "grader");
	html+="<br>";
	
	$("#graderlist").html(html);
}
async function addLaboptions(semester) {
	var data = await querysemester('R', semester);

	var html="";
	
	html+="<label class='form-label' for='lab'>Lab Classes</label>";
	html+= await listclasses(data, "lab");
	html+="<br>";
	
	$("#lablist").html(html);
}
async function listclasses(list, position) {
	var docRef;
	var docSnap;
	var course;
	var id;
	var blank = true;
	var html="<div class='courselist'>";
	var j=0;
	var col =  7;
	
	list.forEach(async(doc) => {
		blank = false;
		course = doc.data();
		id = doc.id;
	
		html+="<div class='form-check form-check-inline'>";
		html+=addclass((course.CourseNumber), (course.CourseType),(course.GradCourse),id, position);
		html+="</div>";
		j++;
		if(j==col){
			j=0;
			html+="<br>";
		}
	});

	html+="</div>"
	if(blank)
		html='<p class="error">There are no ' + position + ' positions available at this time.</p>'
	
	validateCourses();
	
	return html;
}
function addclass(coursenumber,coursetype,gradcourse,id,position){
	var html="";
	var data = coursetype+" "+coursenumber;
	if(gradcourse)
		html+="<input required onclick='validateCourses()' class='"+position+" grad courses form-check-input' type='checkbox' id='"+data+"' name='"+data+"' value='"+id+"'>" +"<label class='form-check-label grad' for='"+data+" hidden'>"+data+"</label>";
	else
		html+="<input required onclick='validateCourses()' class='"+position+" undergrad courses form-check-input' type='checkbox' id='"+data+"' name='"+data+"' value='"+id+"'>" +"<label class='form-check-label undergrad' for='"+data+"'>"+data+"</label>";
	
    return html;
}

// Get a list of courses from your database
async function getCollection(colName) {
  const col = collection(db, colName);
  const snapshot = await getDocs(col);
  const list = snapshot.docs.map(doc => doc.data());
  return list;
}
async function querysemester(coursetype,semester){
	const docRef = collection(db, "Courses");
	const q = query(docRef, where("GraderOrLab", "==", coursetype), where("Semester", "==", semester), orderBy('CourseNumber', 'asc'));
  
	const querySnapshot = await getDocs(q);
  
	return querySnapshot;
}

function uploadFile(user, filename, file) {
var storageRef = ref(storage, user+"/"+filename);

	uploadBytes(storageRef, file).then((snapshot) => {
	  console.log('Uploaded a blob or file!');
	});
}

