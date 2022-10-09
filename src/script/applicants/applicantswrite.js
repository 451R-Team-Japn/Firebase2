function writeApplicants(course){
	console.log("writeApplicants");
	localStorage.setItem("Course", course);
	location.href='applicants.html';
}
function sort() {
	$('.sortTable').DataTable();
}
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

function setFilters() {
  $.fn.dataTable.ext.search.push(
    function( settings, searchData, index, rowData, counter ) {
      var positions = $('input:checkbox[name="pos"]:checked').map(function() {
        return this.value;
      }).get();
   
      if (positions.length === 0) {
        return true;
      }
      
      if (positions.indexOf(searchData[1]) !== -1) {
        return true;
      }
      
      return false;
    }
  );

  
  $.fn.dataTable.ext.search.push(
    function( settings, searchData, index, rowData, counter ) {
   
      var offices = $('input:checkbox[name="ofc"]:checked').map(function() {
        return this.value;
      }).get();
   

      if (offices.length === 0) {
        return true;
      }
      
      if (offices.indexOf(searchData[2]) !== -1) {
        return true;
      }
      
      return false;
    }
  );
  

  var table = $('#example').DataTable();
  
 $('input:checkbox').on('change', function () {
    table.draw();
 });

}