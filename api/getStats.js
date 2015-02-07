  var db = require('./db');

 exports.init = function (callback) {
    db.view( 'query/all' , function  (err, response) {
      
       var stats = {
            outOfStock   : [],
            osv          : [],
            isuv         : [],
            deviated     : [],
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
          if ( !products[i].value.deviated && products[i].value.instock && !products[i].value.osv ) {
            stats.goodProducts.push(products[i].value);
            continue;
          }
          // out of stock varified
          if( products[i].value.status === 'osv' && !products[i].value.instock){
            stats.osv.push(products[i].value);
            continue;
          }
          // instock unvarified
          if( products[i].value.status === 'isuv' && products[i].value.instock){
            stats.isuv.push(products[i].value);
            continue;
          }
          // deviation
          if(products[i].value.deviated && products[i].value.status === 'isv') {
            stats.deviated.push(products[i].value);
          }
          // out of stock
          if( !products[i].value.instock && products[i].value.status === 'osuv' ){
            stats.outOfStock.push(products[i].value);
          }
          // badProducts
          if ( products[i].value.deviated || !products[i].value.instock && products[i].value.status === 'osuv' ) {
            stats.badProducts.push(products[i].value);
          }

        }

        callback(stats);
    });
  };