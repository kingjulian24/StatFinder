var db = require('./db');
var router = require('./router');


module.exports = function (req,res, pageData) {

var route = router(req, 'all');  

  db.view( route.dbView , route.opts, function  (err, response) {

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
      var data   = (pageData.view === 'all') ? allProducts : badproducts;

      res.render('dashboard.ejs',{
        products        : data,
        title           : 'Dashboard',
        id              : id,
        view            : pageData.view,
        action          : action,
        allCount        : response.length,
        outOfStockCount : outOfStock.length,
        profitLossCount : profitLoss.length,
        available       : goodProducts.length,
        loggedIn        : pageData.loggedIn,
        manage          : route.manage
       

      });

     

      
    } else {
      console.log('failed to query view: '+ pageData.view);
      res.status(404).send('failed to query view: '+ pageData.view);
    }

  });
};




