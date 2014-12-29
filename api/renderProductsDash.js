var db = require('./db');
var stats = require('./getStats');
var router = require('./router');



module.exports = function (req,res, pageData) {
 
  var route = router(req, 'dash');

  db.view( route.dbView , route.opts, function  (err, response) {

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
          products        : allProducts,
          title           : 'Dashboard',
          id              : id,
          view            : pageData.view,
          action          : action,
          allCount        : data.allProducts.length,
          outOfStockCount : data.outOfStock.length,
          profitLossCount : data.profitLoss.length,
          available       : data.goodProducts.length,
          loggedIn        : pageData.loggedIn,
          manage          : route.manage
        });

     });

    } else {
      console.log('failed to query view: '+ pageData.view);
      res.status(404).send('failed to query view: '+ pageData.view);
    }

  });
};




