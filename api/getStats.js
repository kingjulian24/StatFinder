var db = require('./db');

 exports.init = function (callback) {
    db.view( 'queries/all' , function  (err, response) {
      
       var stats = {
            outOfStock: [],
            profitLoss: [],
            allProducts: [],
            goodProducts: [],
            badProducts: [],
            inStockUnverified: [],
            outOfStockVerified: [],
            err: err,
            response: response
          };

        
        var products = response.rows;

        for (var i = 0; i < products.length; i++) {
          stats.allProducts.push(products[i].value);
          if(products[i].value.out_of_stock_verified === 'on' && products[i].value.instock  && products[i].value.in_stock_verified === 'off') {
            stats.inStockUnverified.push(products[i].value);
          }
          if(products[i].value.out_of_stock_verified === 'on'){
            stats.outOfStockVerified.push(products[i].value);
          }
          if(!products[i].value.instock && products[i].value.out_of_stock_verified === 'off'){
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



 

































