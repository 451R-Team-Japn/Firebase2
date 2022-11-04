function Search() {
  var input = document.getElementById("Search");
  var filter = input.value.toLowerCase();
  var nodes = document.getElementsByClassName('target');

  for (i = 0; i < nodes.length; i++) {
	  console.log(nodes[i].style.display);
    if (nodes[i].innerText.toLowerCase().includes(filter)) {
      nodes[i].parentNode.parentNode.parentNode.style.display = "block";
    } else {
      nodes[i].parentNode.parentNode.parentNode.style.display = "none";
    }
  }
}

$(document).on("click", ".checkbox" ,function() {
	changeCheckbox();
});

async function changeCheckbox(ele){
	filter();
}

function filter(){
	var filters="";
	var majors="";
	var pos="";
	var semesters="";
	var grad="";
	
    var majorcheckboxes = document.getElementsByClassName('major-checkbox');
	var poscheckboxes = document.getElementsByClassName('pos-checkbox');
	var semestercheckboxes = document.getElementsByClassName('semester-checkbox');
	var gradcheckboxes = document.getElementsByClassName('grad-checkbox');
	
	majors = filterField(majorcheckboxes);
	pos = filterField(poscheckboxes);
	semesters = filterField(semestercheckboxes);
	grad = filterField(gradcheckboxes);
	
	
	if(typeof getPagetype === "function"){
		var appcheckboxes = document.getElementsByClassName('app-checkbox');
		var app = filterField(appcheckboxes);
	}

	function filterField(checkboxes){
		var classes = "";
		var list=[];
		var counter = 0;
		
		var chekboxInputs = Array.from(checkboxes).map(a => a.querySelector('input'));
		
		var allAreUnselected = chekboxInputs.every(function(elem){
			return !elem.checked;
		});
		if(allAreUnselected){
			chekboxInputs.forEach(function(input){
				if(input){
					list[counter] = input.getAttribute("value"); 
					counter++;
					addFilter(list);
				}
			});
		}
		else {
			chekboxInputs.forEach(function(input){
				if(input.checked){
					list[counter] = input.getAttribute("value"); 
					counter++;
					console.log(list);
					addFilter(list);
				}
			});
		}


		function addFilter(list){
			classes = ":not(";
			for(var i=0;i<list.length;i++){
				console.log(list[i]);
				classes+="."+list[i];
				if(i!==list.length-1)
					classes+=","
			}
			console.log(classes);			
		}
		classes+=")"
		
		return classes;
	}
	
	filters=majors+", "+pos+", "+semesters+", "+grad
	
	if(typeof getPagetype === "function")
		filters+=", "+app;
	
	console.log("filters "+filters);
	
	$('.all').show().filter(filters).hide();
}

function uncheck(ele){
	var classes =  ele.classList;
	console.log(classes.length, classes[1]);
	 $('input.'+classes[1]).not(ele).prop('checked', false); 
}

function collapseCards(value){
	$('.collapse').collapse(value);
}