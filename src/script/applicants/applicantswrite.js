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

function changeDoc(value){
	document.getElementById("iframepdf");
	$("#iframepdf").attr("src", "files/"+value+".pdf");
	$("#myModalLabel").html(value);
	modal();
}

function modal(){
	$('#courseModal').modal('toggle');
}

$("button[data-number=1]").click(function(){
    $('#courseModal').modal('hide');
});

$("button[data-number=2]").click(function(){
    $('#applicantsModal').modal('hide');
});

function getPagetype(){
	return 1;
}