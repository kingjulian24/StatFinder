var db = require('./db');
var stats = require('./getStats');
var router = require('./router');



module.exports = function (req,res, pageData) {
 
 // get request page and options
  var requestedPage = router(req, pageData.dbView);

  // query db
  db.view( requestedPage.dbView , requestedPage.opts, function  (err, response) {

    if(!err) {

      // save response if no error
      var allProducts = [];
      var products = response.rows;

      for (var i = 0; i < products.length; i++) {
        allProducts.push(products[i].value);
      }

      // save id and action if any
      var updateRequest = {
        id: req.param('id') || '',
        action: req.param('action') || ''
      };

      
      // get stats with init callback
      stats.init( function (statsData) {

        // render dash and pass product info and page data
        res.render('dashboard.ejs', 
        {
          products                : allProducts,
          title                   : 'Dashboard',
          id                      : updateRequest.id,
          action                  : updateRequest.action,
          loggedIn                : pageData.loggedIn,
          view                    : pageData.dbView,
          allCount                : statsData.allProducts.length,
          outOfStockCount         : statsData.outOfStock.length,
          profitLossCount         : statsData.profitLoss.length,
          available               : statsData.goodProducts.length,
          inStockUnverifiedCount  : statsData.inStockUnverified.length,
          outOfStockVerifiedCount : statsData.outOfStockVerified.length,
          manage                  : requestedPage.manage
        });

     });

    } else {
      console.log('failed to query view: '+ pageData.dbView);
      res.status(404).send('failed to query view: '+ pageData.dbView);
    }

  });
};




