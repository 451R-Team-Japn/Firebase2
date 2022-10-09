/*function change(value){
	console.log(value);
    var checkboxes = document.getElementsByClassName(value);
    var chekboxInputs = Array.from(checkboxes).map(a => a.querySelector('input'));
    var allAreUnselected = chekboxInputs.every(function(elem){
       return !elem.checked;
    });
    if(allAreUnselected){
       chekboxInputs.forEach(function(input){
          Array.from(document.querySelectorAll("." + input.getAttribute("rel"))).forEach(function(item){
              item.style.display = 'block';
          });
       });
    }
    else {
      chekboxInputs.forEach(function(input){
          Array.from(document.querySelectorAll("." + input.getAttribute("rel"))).forEach(function(item){
            item.style.display = input.checked ? 'block' : 'none';
          });
       });
    }
}
change();*/

function change(value){
	var counter = 0;
	var i=0;
	var list=[];
	console.log(value);
    var checkboxes = document.getElementsByClassName('checkbox');
    var chekboxInputs = Array.from(checkboxes).map(a => a.querySelector('input'));
    var allAreUnselected = chekboxInputs.every(function(elem){
		return !elem.checked;
	});
	if(allAreUnselected){
		chekboxInputs.forEach(function(input){
			Array.from(document.querySelectorAll("." + input.getAttribute("rel"))).forEach(function(item){
				item.style.display = 'block';
			});
		});
    }
    else {
		chekboxInputs.forEach(function(input){
			if(input.checked){
				list[counter] = input.getAttribute("rel"); 
				counter++;
			}
		});
		var classes="";
		for(i;i<list.length;i++){
			console.log(list[i]);
			classes+="."+list[i];
			console.log(classes);
		}
		Array.from(document.querySelectorAll(".all")).forEach(function(item){
			item.style.display = 'none';
		});
		Array.from(document.querySelectorAll(classes)).forEach(function(item){
			item.style.display = 'block';
		});

	   
		   
    }
}
change();