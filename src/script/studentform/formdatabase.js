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
var user;
var applicant;

$(document).ready(function () { 
	var term = getCurrentterm();
	console.log(term);
	getUser();
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
	if(!submitForm())
		event.preventDefault();
	else{
		applicant=getData();
		await setDoc(doc(db, "Applicants", currentuser), applicant);
		user=updateUser();
		await updateDoc(doc(db, "AccountStudent", currentuser), user);
		
		files=getFiles();
		
		if(files.Resume.File !== undefined)
			uploadFile(currentuser, files.Resume.Name, files.Resume.File);
		if(files.Transcript.File !== undefined)
			uploadFile(currentuser, files.Resume.Name, files.Resume.File);
		if(files.GTA.File !== undefined)
			uploadFile(currentuser, files.Resume.Name, files.Resume.File);
		
	}
})
$('.gtainput').click(function(){

})

async function getUser() {
	currentuser = await localStorage.getItem("ID");
	const docRef = doc(db, "AccountStudent", currentuser);
	const docSnap = await getDoc(docRef);
	user = docSnap.data();
	var gtaradiobtn = document.getElementById("onrecord");
	var gtaradiosecbtn = document.getElementById("pending");
	if(user.GTACertified > 0){
		if(user.GTACertified == 1)
			gtaradiosecbtn.checked = true;
		if(user.GTACertified == 2)
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
	document.getElementById("fname").value = user.FirstName;
	document.getElementById("fname").readOnly = true;
	document.getElementById("lname").value = user.LastName;
	document.getElementById("lname").readOnly = true;
	document.getElementById("studentID").value = user.StudentID;
	document.getElementById("studentID").readOnly = true;
	document.getElementById("email").value = user.Email;
	document.getElementById("email").readOnly = true;
	document.getElementById("major").value = user.Major;
}
$('.level').click(function(){
	var level = document.querySelector('input[name="level"]:checked').value;
	var gtaradiobtn = document.getElementById("null");

	if(level==0){
		setremovehidden(true, 'grad');
		gtaradiobtn.checked = false;
	}
	else{
		setremovehidden(false, 'grad');
	}
	if(level!=0 && user.GTACertified == 0){
		document.getElementById("gta").hidden = false;
		gtaradiobtn.checked = false;
	}
	else if(user.GTACertified == 0){
		document.getElementById("gta").hidden = true;
		gtaradiobtn.checked = true;
		updateGTA(3);
	}
	else if(user.GTACertified >= 0){
		document.getElementById("gta").hidden = true;
		makehidden('gtafilebtn', true);
	}
})
async function addGraderoptions(semester) {
	var data = await querysemester('G', semester);

	var html="";
	//var data=await getCollectionID('GraderCourses');
	
	html+="<label class='form-label' for='grader'>Grader Classes</label>";
	//var graderclasses = data["CourseID"];
	html+= await listclasses(data, "grader");
	html+="<br>";
	
	//console.log(html);
	$("#graderlist").html(html);
}
async function addLaboptions(semester) {
	var data = await querysemester('R', semester);

	var html="";
	//var data=await getCollectionID('GraderCourses');
	
	html+="<label class='form-label' for='lab'>Lab Classes</label>";
	//var graderclasses = data["CourseID"];
	html+= await listclasses(data, "lab");
	html+="<br>";
	
	//console.log(html);
	$("#lablist").html(html);
}
async function listclasses(list, position) {
	//anyavailable = false;
	var docRef;
	var docSnap;
	var course;
	var id;
	var blank = true;
	var html="<div class='courselist'>";
	var j=0;
	//list=[];
	//var col =  Math.ceil(list.length / 8);
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
		
	/*for(var i=0;i<list.length;i++){
		data.forEach((doc) => {
		course = doc.data();
		id = doc.id;
		});
		//docRef = doc(db, "GraderCourses", list[i]);
		//docSnap = await getDoc(docRef);
		course = docSnap.data();
		
		console.log(id, ", ", course.CourseNumber, ", ", course.CourseType);
	
		html+="<div class='form-check form-check-inline'>";
		html+=addclass((course.CourseNumber), (course.CourseType), position);
		html+="</div>";
		j++;
		if(j==col){
			j=0;
			html+="<br>";
		}
	}*/
	html+="</div>"
	if(blank)
		html='<p class="error">There are no ' + position + ' positions available at this time.</p>'
	
	validateCourses();
	
	return html;
}
function addclass(coursenumber,coursetype,gradcourse,id,position){
	var html="";
	var data = coursetype+" "+coursenumber;
	//console.log(id, ", ", coursetype, ", ", coursenumber);
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

	//const q = query(docRef, orderBy(index, order));
  
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
// Detect auth state
//auth.onAuthStateChanged(user => {
});

async function uploadFile(user, filename, file) {
const storageRef = ref(storage, user+"/"+filename);

	// 'file' comes from the Blob or File API
	uploadBytes(storageRef, file).then((snapshot) => {
	  console.log('Uploaded a blob or file!');
	});
});

onAuthStateChanged(auth, user => {
  if(user != null){
	console.log('logged in!');
  } else {
	console.log('No user');
  }
});

