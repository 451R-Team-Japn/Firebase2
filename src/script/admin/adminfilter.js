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
	console.log(value);
    var checkboxes = document.getElementsByClassName('checkbox');
    var chekboxInputs = Array.from(checkboxes).map(a => a.querySelector('input'));
	console.log(chekboxInputs.checked);
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
change();