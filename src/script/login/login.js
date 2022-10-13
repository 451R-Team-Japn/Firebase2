import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { getFirestore, collection, getDocs, getDoc, query, where, limit } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';

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


$(document).ready(function () { 
	localStorage.setItem("ID", null);
	sessionStorage.setItem("ID", null);
});

$('#login').submit(function(){
	if(!submitlogin());
		event.preventDefault();
})

async function submitlogin(){
	//console.log("cat");
	var html="";
	if(await validatelogin('AccountStudent')){
		console.log("studentLogin");
		window.location.href = '/studentform.html';
		document.getElementById('login').action = 'studentform.html';
		//localStorage.setItem("ID", current.StudentKeyID);
		//var currentuser = await localStorage.getItem("ID");
		//console.log(currentuser);
		return true;
	}
	else if(await validatelogin('AccountAdmin')){
		console.log("adminLogin");
		window.location.href = '/admin.html';
		document.getElementById('login').action = 'admin.html';
		return true;
	}
	else{
		console.log("failed");
		html=validateloginmessage();
		$("#loginerror").html(html);
		return false;
	}
}

async function validatelogin(col){
	//var html="";
	//let passpattern = new RegExp('^().{6,24}$');
	var email = document.getElementById('email').value.toLowerCase();
	var password = document.getElementById('password').value;
	var keep = document.getElementById('keep').checked;
	
	console.log(keep);
	
	var username = String(email).split("@");
	var testemail = username[0] + "@umkc.edu";
	
	console.log(username[0]);
	
	//var users = await queryUsers(col);
	var user = await checkLogin(col,testemail, password);
	
	//var current;
	//var username;
	//var pattern = new RegExp('^' + email + '$', 'i');
	
	var result = false;
	
	user.forEach(doc => {	
	// doc.data() is never undefined for query doc snapshots
	console.log(doc.id, " => ", doc.data());
	
	console.log(doc.exists);
		if (doc.exists){
			if(keep)
				localStorage.setItem("ID", doc.id);
			else 
				sessionStorage.setItem("ID", doc.id);
			result = true;
		}
	});
	
	//users.forEach((doc) => {
	// doc.data() is never undefined for query doc snapshots
	//console.log(doc.id, " => ", doc.data());
	//});
	
	/*users.each(doc => {
		current=doc.data();
		//console.log(current.id);
		console.log(current.Email,current.Password);
		//console.log(current.Password);
		username = String(current.Email).split("@");
		if(pattern.test(current.Email) || pattern.test(username[0])){ 
			console.log("true");
			if (password==current.Password){
				localStorage.setItem("ID", doc.id);
				result = true;
			}
		}
	});
	users.forEach(doc => {
		current=doc.data();
		//console.log(current.id);
		console.log(current.Email,current.Password);
		//console.log(current.Password);
		username = String(current.Email).split("@");
		if(pattern.test(current.Email) || pattern.test(username[0])){ 
			console.log("true");
			if (password==current.Password){
				localStorage.setItem("ID", doc.id);
				result = true;
			}
		}
	});*/
	
	//var data = await getCollection(col);
	//var dataid = await getCollectionID(col);


	/*for(var i=0;i<users.length;i++){
		current=users[i];
		//console.log(current.id);
		console.log(current.Email,current.Password);
		//console.log(current.Password);
		username = String(current.Email).split("@");
		if(pattern.test(current.Email) || pattern.test(username[0])){ 
			console.log("true");
			if (password==current.Password){
				await localStorage.setItem("ID", dataid[i]);
				return true;
			}
		}
	}*/
	return result;
}
function validateloginmessage(){
	var html="";
	let pattern = new RegExp('^().{6,24}$');
	var email = document.getElementById('email').value.toLowerCase();
	var password = document.getElementById('password').value;
	
	console.log(pattern.test(password))
	if(email != ""){
		if(pattern.test(password))
			html='<p>Email and/or password is not in our records.</p>';
		else
			html="";
	}
	return html;
}

// Get a list of courses from your database
async function getCollection(colName) {
  const col = collection(db, colName);
  const snapshot = await getDocs(col);
  const list = snapshot.docs.map(doc => doc.data());
  //console.log(colName);
  //console.log(list);
  return list;
}

async function getCollectionID(colName) {
const col = collection(db, colName);
  const snapshot = await getDocs(col);
  const list = snapshot.docs.map(doc => doc.id);
  //console.log(colName);
  //console.log(list);
  return list;
}

async function queryUsers(colName){
	const docRef = collection(db, colName);
	const q = query(docRef, limit(1));
  
	const querySnapshot = await getDocs(q);
  
	/*querySnapshot.forEach((doc) => {
	// doc.data() is never undefined for query doc snapshots
	console.log(doc.id, " => ", doc.data());
	});*/
  
	return querySnapshot;
}
async function checkLogin(colName,email, password){
	var docRef = collection(db, colName);
	var q = query(docRef, where("Email", "==", email), where("Password", "==", password));
  
	var querySnapshot = await getDocs(q);
	
	return querySnapshot;
	
}