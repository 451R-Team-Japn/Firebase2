function Search() {
  var input = document.getElementById("Search");
  var filter = input.value.toLowerCase();
  var nodes = document.getElementsByClassName('all');

  for (i = 0; i < nodes.length; i++) {
	  console.log(nodes[i].style.display);
    if (nodes[i].innerText.toLowerCase().includes(filter)) {
      nodes[i].style.display = "block";
    } else {
      nodes[i].style.display = "none";
    }
  }
}


async function changeCheckbox(ele){
	//await uncheck(ele);
	$('.all').show().filter(':not(.CS, .IT) :not(Grader)').hide();
	//filter();
}
/*function filter(){
	var counter = 0;
	var i=0;
	var list=[];
    var checkboxes = document.getElementsByClassName('checkbox');
    var chekboxInputs = Array.from(checkboxes).map(a => a.querySelector('input'));
    var allAreUnselected = chekboxInputs.every(function(elem){
		return !elem.checked;
	});
	if(allAreUnselected){
		chekboxInputs.forEach(function(input){
			Array.from(document.querySelectorAll("." + input.getAttribute("value"))).forEach(function(item){
				item.style.display = 'block';
			});
		});
    }
    else {
		chekboxInputs.forEach(function(input){
		if(input.checked){
			list[counter] = input.getAttribute("value"); 
			counter++;
		}
	});
		var classes="";
		for(i;i<list.length;i++){
			classes+="."+list[i];
		}
		Array.from(document.querySelectorAll(".all")).forEach(function(item){
			item.style.display = 'none';
		});
		Array.from(document.querySelectorAll(classes)).forEach(function(item){
			item.style.display = 'block';
		});
    }
}*/

function filter(){
	var counter = 0;
	var i=0;
	var list=[];
	
    var majorcheckboxes = document.getElementsByClassName('major');
	var semestercheckboxes = document.getElementsByClassName('semester');
	
	$('.all').show().filter(':not(.CS).Grader').hide();
	
    var chekboxInputs = Array.from(checkboxes).map(a => a.querySelector('input'));
    var allAreUnselected = chekboxInputs.every(function(elem){
		return !elem.checked;
	});
	if(allAreUnselected){
		chekboxInputs.forEach(function(input){
			Array.from(document.querySelectorAll("." + input.getAttribute("value"))).forEach(function(item){
				item.style.display = 'block';
			});
		});
    }
    else {
		chekboxInputs.forEach(function(input){
		if(input.checked){
			list[counter] = input.getAttribute("value"); 
			counter++;
		}
	});
		var classes="";
		for(i;i<list.length;i++){
			classes+="."+list[i];
		}
		Array.from(document.querySelectorAll(".all")).forEach(function(item){
			item.style.display = 'none';
		});
		Array.from(document.querySelectorAll(classes)).forEach(function(item){
			item.style.display = 'block';
		});
    }
}

function uncheck(ele){
	var classes =  ele.classList;
	console.log(classes.length, classes[1]);
	 $('input.'+classes[1]).not(ele).prop('checked', false); 
}

function collapseCards(value){
	$('.collapse').collapse(value);
}
//old filter
/*function filter(){
    if ($('input[type="checkbox"]:checked').length > 0) {
		$('.all').hide();
        $('input[type="checkbox"]:checked').each(function() {
			classname="."+this.value;
			//alert(this.value);
			$(classname).fadeIn();
        });
    } else {
        $('.open-position-container > div').fadeIn();

    }
}*/