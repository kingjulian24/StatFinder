var db = require('./db');

 exports.init = function (callback) {
    db.view( 'queries/all' , function  (err, response) {
      
       var stats = {
            outOfStock: [],
            profitLoss: [],
            allProducts: [],
            goodProducts: [],
            badProducts: [],
            err: err,
            response: response
          };

        
        var products = response.rows;

        for (var i = 0; i < products.length; i++) {
          stats.allProducts.push(products[i].value);
          
          if(!products[i].value.instock){
            stats.outOfStock.push(products[i].value);
          }
          if(!products[i].value.profit) {
            stats.profitLoss.push(products[i].value);
          }
          if ( products[i].value.profit && products[i].value.instock ) {
            stats.goodProducts.push(products[i].value);
          }
          if ( !products[i].value.profit || !products[i].value.instock ) {
            stats.badProducts.push(products[i].value);
          }

        }
        callback(stats);
    });
  };



 

































