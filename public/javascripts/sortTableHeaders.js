var loc = require('./loc.js');
var helpers = require('./helpers.js');

function addSortingLinks(data) {

  var desc = helpers.getParameterByName('desc');
  var view = helpers.getParameterByName('view');
  
  if(desc !== '') {

    if(desc === 'true'){
      
      $(data.header).attr('href','/'+loc+'?view='+data.view+'&desc=false');
      
      if( data.view === view ) {
      	$(data.header).append(' <i class="fa fa-sort-desc"></i>');
      } else {
      	$(data.header).append(' <i class="fa fa-sort"></i>');
      }
      	
    } else if (desc === 'false'){
      
      $(data.header).attr('href','/'+loc+'?view='+data.view+'&desc=true');

      if( data.view === view ) {
      	$(data.header).append(' <i class="fa fa-sort-asc"></i>');
      } else {
      	$(data.header).append(' <i class="fa fa-sort"></i>');
      }
      	
    }
  } else {
  	
    $(data.header).attr('href','/'+loc+'?view='+data.view+'&desc=false').
    	append(' <i class="fa fa-sort"></i>');
  }

} //if(desc !== '') {


var addAllLinks = function () {

	var headerArray = $('thead tr th').not('.delete-head');
	var hid;
	var hview;
	var header;
	var headerData;

	for(var i = 0; i < headerArray.length/2; i++) {
	  header = $(headerArray[i]);

	  if(header.attr('class') !== undefined) {
	    
	    hid = '.'+header.attr('class')+' a';
	    hview = header.data('view');
	    
	    headerData = {
	      header: hid,
	      view: hview
	    };
	    
	    addSortingLinks(headerData);

	  }

	}
};

exports.addAllLinks = addAllLinks;






