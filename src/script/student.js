import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { getFirestore, collection, doc, getDocs, getDoc, query, where, limit } from  'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';
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
var currentuser;

$(document).ready(function () { 
	var accounttype = getAccounttype();
	
	console.log(accounttype);
});

$('#logout').click(function(){
	localStorage.setItem("ID", null);
	sessionStorage.setItem("ID", null);
	
	window.location.href = 'index.html';
})

function logout() {
	localStorage.setItem("ID", null);
	sessionStorage.setItem("ID", null);
	
	window.location.href = 'index.html';
}
function redirect(){
	
}

async function getCollection(colName, id) {
	var docRef = doc(db, colName, id);
	var doc = await getDoc(docRef);
   
	console.log(doc);
	console.log(doc.exists);
	return doc.exists;

}
function getLoginID() {
	if (localStorage.getItem("ID") !== null)
		currentuser = localStorage.getItem("ID");
	else
		currentuser = sessionStorage.getItem("ID");
	
	return currentuser;
}
async function getAccounttype() {
	var id = getLoginID();
	
	if(await getCollection('AccountStudent', id))
		return 'AccountStudent';
	else if(await getCollection('AccountAdmin', id))
		return 'AccountAdmin';
	else
	return 'blank';
}

	