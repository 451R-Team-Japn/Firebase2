function filter(){
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
//filter();