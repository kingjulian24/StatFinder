var db = require('./db');


module.exports = function (req,res,view) {
  var dbView ,
      opts,
      manage;
  
  // query for default pages
  if(req.param('view') ===  undefined){
    
    dbView ='queries/all';
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

    dbView ='queries/'+ req.param('view');
    opts = {
      descending: desc
    };
  }
  

  db.view( dbView , opts, function  (err, response) {

    if(!err) {

    var outOfStock = [];
    var profitLoss = [];
    var allProducts = [];
    var goodProducts = [];
    var products = response.rows;

    for (var i = 0; i < products.length; i++) {
      allProducts.push(products[i].value);
      
      if(!products[i].value.instock){
        outOfStock.push(products[i].value);
      }
      if(!products[i].value.profit) {
        profitLoss.push(products[i].value);
      }
      if ( products[i].value.profit && products[i].value.instock ) {
        goodProducts.push(products[i].value);
      }

    }

 

      var badproducts = outOfStock.concat(profitLoss);
      var id     = req.param('id') || '';
      var action = req.param('action') || '';
      var data   = (view === 'all') ? allProducts : badproducts;

  



        res.render('dashboard.ejs',{
          products : data,
          title    : 'Dashboard',
          id       : id,
          view     : view,
          action   : action,
          allCount : response.length,
          outOfStockCount: outOfStock.length,
          profitLossCount: profitLoss.length,
          available: goodProducts.length,
          manage: manage
         

        });

     

      
    } else {
      console.log('failed to query view: '+ view);
      res.status(404).send('failed to query view: '+ view);
    }

  });
};




