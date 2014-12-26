var loc = require('./loc.js');
var helpers = require('./helpers.js');

function addSortingLinks(data) {
	console.log(data);
  var desc = helpers.getParameterByName('desc');
  
  if(desc !== undefined) {

    if(desc === 'true'){
      $(data.header).attr('href','/'+loc+'?view='+data.view);
    } else {
      $(data.header).attr('href','/'+loc+'?view='+data.view+'&desc=true');
    }
  } else {
  	//console.log('test');
    $(data.header).attr('href','/'+loc+'?view='+data.view);
  
  }

}


// function addSortedTableHeaders (data) {

//   for (var i = 0; i < data.length; i++) {
//     addSortingLinks({
//       header: data[i].header,
//       view: data[i].view
//     });
//   }
// }

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
	    //console.log(headerData);
	  }

	}
};

exports.addAllLinks = addAllLinks;






