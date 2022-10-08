var step =0;
function run() {
	for(var i=0;i<5;i++){
		cloneCard(i);
	}
	step++;
	console.log(step);
}
function writeApplicants(course){
	localStorage.setItem("Course", course);
	location.href=applicants.html;
}
function sort() {
	$('.sortTable').DataTable();
}
/*function cloneCard(i) {
	var html = "";
	const node = document.getElementById("card");
	const clone = node.cloneNode(true);
	var area;
	var id;
	var data=[{"id":"one", "Class":"CS 490", "Position": "Grader" , "Notes": "ghuewfjiewfjimefw", "Button":"index.html" },{"id":"two", "Class": "CS 449" , "Position": "Grader" , "Notes": "gfeg", "Button":"index.html" },{"id":"three", "Class": "CS 404" , "Position": "Grader" , "Notes": "egegeg", "Button":"index.html" },{"id":"four", "Class": "CS 303" , "Position": "Grader" , "Notes": "eggege", "Button":"index.html" },{"id":"five", "Class": "CS 451R" , "Position": "Grader" , "Notes": "egegegeg", "Button":"index.html" }];
	var classes=["CS 490","CS 449","CS 404","CS 303","CS 451R"];
	var g;
	
	current=data[i];
	
		//console.log(step);
		//console.log(array[step]);
		//console.log(classes[step]);
		
		g = document.createElement('div');
		g.setAttribute("id", current.id);
		
		document.getElementById('open-position-container').appendChild(g);
		
		document.getElementById(current.id).appendChild(clone);			
		classname='#'+current.id+' #classname'; 
		position='#'+current.id+' #position'; 
		notes='#'+current.id+' #notes'; 
		button='#'+current.id+' #button'; 
		$(classname).html(current.Class);
		$(position).html(current.Position);
		$(notes).html(current.Notes);
		$(button).attr("value", current.Button);
	
			
		console.log(document.getElementById('open-position-container').innerHTML);
	
	
}*/
function Search() {
  var input = document.getElementById("Search");
  var filter = input.value.toLowerCase();
  var nodes = document.getElementsByClassName('target');

  for (i = 0; i < nodes.length; i++) {
    if (nodes[i].innerText.toLowerCase().includes(filter)) {
      nodes[i].style.display = "block";
    } else {
      nodes[i].style.display = "none";
    }
  }
}