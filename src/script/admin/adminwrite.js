var step =0;
function run() {
	for(var i=0;i<5;i++){
		cloneCard(i);
	}
	step++;
	console.log(step);
}
function cloneCard(i) {
	var html = "";
	const node = document.getElementById("card");
	const clone = node.cloneNode(true);
	var area;
	var id;
	var data=[{"id":"one", "Class":"CS 490", "Position": "Grader" , "Notes": "ghuewfjiewfjimefw" },{"id":"two", "Class": "CS 449" , "Position": "Grader" , "Notes": "gfeg" },{"id":"three", "Class": "CS 404" , "Position": "Grader" , "Notes": "egegeg" },{"id":"four", "Class": "CS 303" , "Position": "Grader" , "Notes": "eggege" },{"id":"five", "Class": "CS 451R" , "Position": "Grader" , "Notes": "egegegeg" }];
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
		$(classname).html(current.Class);
		$(position).html(current.Position);
		$(notes).html(current.Notes);
	
			
		console.log(document.getElementById('open-position-container').innerHTML);
	
	
}