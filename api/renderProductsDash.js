var db = require('./db');
var stats = require('./getStats');



module.exports = function (req,res,view) {
  var dbView ,
      opts,
      manage;
  
  // query for default pages
  if(req.param('view') ===  undefined){
    
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
    
    // sorted query 

    dbView ='queries/dash'+ req.param('view');
    opts = {
      descending: Boolean(req.param('desc'))
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
      

      

      var callback = function (data) {

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

     };
     stats.init(callback);
     

      
    } else {
      console.log('failed to query view: '+ view);
      res.status(404).send('failed to query view: '+ view);
    }

  });
};




