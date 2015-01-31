  var db = require('./db');

 exports.init = function (callback) {
    db.view( 'queries/all' , function  (err, response) {
      
       var stats = {
            outOfStock   : [],
            osv          : [],
            isuv         : [],
            profitLoss   : [],
            allProducts  : [],
            goodProducts : [],
            badProducts  : [],
            err          : err,
            response     : response
          };

        

        
        var products = response.rows;

        for (var i = 0; i < products.length; i++) {
          stats.allProducts.push(products[i].value);
          // good products
          if ( products[i].value.profit && products[i].value.instock && !products[i].value.osv ) {
            stats.goodProducts.push(products[i].value);
            continue;
          }
          // out of stock varified
          if( products[i].value.osv && !products[i].value.instock){
            stats.osv.push(products[i].value);
            continue;
          }
          // instock unvarified
          if( products[i].value.osv && products[i].value.instock){
            stats.isuv.push(products[i].value);
            continue;
          }
          // profit loss
          if(!products[i].value.profit) {
            stats.profitLoss.push(products[i].value);
          }
          // out of stock
          if( !products[i].value.instock && !products[i].value.osv ){
            stats.outOfStock.push(products[i].value);
          }
          if ( !products[i].value.profit || !products[i].value.instock ) {
            stats.badProducts.push(products[i].value);
          }

        }

        callback(stats);
    });
  };