module.exports = function (req,view) {
	var dbView ,
      opts,
      manage;

  // check for sorting request
  if(req.param('view') ===  undefined){
      // display dash
      dbView ='queries/'+view;
      opts = {
        descending: false
      };

      // check to see if manage page is set
    if(req.param('manage') !==  undefined) {
      manage = true;
    } else {
      manage = false;
    }
    
  } else {
    
    //sort
    var desc = req.param('desc');
    
    // sort all
    if(view === 'all') {
      dbView ='queries/'+ req.param('view');
    
    // sort bad products
    } else {
      dbView ='queries/dash'+ req.param('view');
    }
    
    opts = {
      descending: desc
    };

  }

  return  {dbView: dbView, opts: opts, manage: manage};
};