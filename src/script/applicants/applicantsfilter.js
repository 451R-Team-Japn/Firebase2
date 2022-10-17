$(document).ready( function () {
  $.fn.dataTable.ext.search.push(
    function( settings, searchData, index, rowData, counter ) {
      var majors = $('input:checkbox[name="maj"]:checked').map(function() {
        return this.value;
      }).get();
   
      if (majors.length === 0) {
        return true;
      }
      
      if (majors.indexOf(searchData[4]) !== -1) {
        return true;
      }
      
      return false;
    }
  );

  
  $.fn.dataTable.ext.search.push(
    function( settings, searchData, index, rowData, counter ) {
   
      var levels = $('input:checkbox[name="lev"]:checked').map(function() {
        return this.value;
      }).get();
   

      if (levels.length === 0) {
        return true;
      }
      
      if (levels.indexOf(searchData[3]) !== -1) {
        return true;
      }
      
      return false;
    }
  );
  

  var table = $('#sortTable').DataTable();({"scrollX": true}, {"scrollY": false});
  
 $('input:checkbox').on('change', function () {
    table.draw();
 });

} );
