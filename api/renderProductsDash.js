var db = require('./db');
var stats = require('./getStats');



module.exports = function (req,res,view) {
  var dbView ,
      opts,
      manage;
  
  
  if(req.param('view') ===  undefined){
    // display dash
    dbView ='queries/dash';
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

    dbView ='queries/dash'+ req.param('view');
    opts = {
      descending: desc
    };

  }
  

  db.view( dbView , opts, function  (err, response) {

    if(!err) {

    var allProducts = [];
    var products = response.rows;

    for (var i = 0; i < products.length; i++) {
      allProducts.push(products[i].value);
    }

      var id     = req.param('id') || '';
      var action = req.param('action') || '';

      stats.init( function (data) {

        res.render('dashboard.ejs',{
          products : allProducts,
          title    : 'Dashboard',
          id       : id,
          view     : view,
          action   : action,
          allCount : data.allProducts.length,
          outOfStockCount: data.outOfStock.length,
          profitLossCount: data.profitLoss.length,
          available: data.goodProducts.length,
          manage: manage
        });

     });

    } else {
      console.log('failed to query view: '+ view);
      res.status(404).send('failed to query view: '+ view);
    }

  });
};




