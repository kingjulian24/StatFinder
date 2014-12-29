module.exports = function (req,view) {
	var dbView ,
      opts,
      manage;

	  if(req.param('view') ===  undefined){
    // display dash
    dbView ='queries/'+view;
    opts = {
      descending: false
    };
    if(req.param('manage') !==  undefined) {
      manage = true;
    } else {
      manage = false;
    }
    
  } else {
    //sort
    var desc = req.param('desc');

    dbView ='queries/'+view+''+ req.param('view');
    opts = {
      descending: desc
    };

  }

  return  {dbView: dbView, opts: opts, manage: manage};
};