import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
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

$('#login').submit(function(){
	if(!submitlogin());
		event.preventDefault();
})

async function submitlogin(){
	var html="";
	if(await validatelogin('AccountStudent')){
		window.location.href = '/studentform.html';
		document.getElementById('login').action = 'studentform.html';
		return true;
	}
	else if(await validatelogin('AccountAdmin')){
		window.location.href = '/admin.html';
		document.getElementById('login').action = 'admin.html';
		return true;
	}
	else{
		html=validateloginmessage();
		$("#loginerror").html(html);
		return false;
	}
}

async function validatelogin(col){
	var email = document.getElementById('email').value.toLowerCase();
	var password = document.getElementById('password').value;
	
	var username = String(email).split("@");
	var testemail = username[0] + "@umkc.edu";
	
	var user = await checkLogin(col,testemail, password);
	
	var result = false;
	
	user.forEach(doc => {
		if (doc.exists){
			sessionStorage.setItem("ID", doc.id);
			sessionStorage.setItem("Type", col);
			result = true;
		}
	});

	return result;
}
function validateloginmessage(){
	var html="";
	let pattern = new RegExp('^().{6,24}$');
	var email = document.getElementById('email').value.toLowerCase();
	var password = document.getElementById('password').value;
	
	if(email != ""){
		if(pattern.test(password))
			html='<p>Email and/or password is not in our records.</p>';
		else
			html="";
	}
	return html;
}

async function checkLogin(colName,email, password){
	var docRef = collection(db, colName);
	var q = query(docRef, where("Email", "==", email), where("Password", "==", password));
  
	var querySnapshot = await getDocs(q);
	
	return querySnapshot;
	
}