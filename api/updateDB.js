var db = require('./db');
var saveToDB = require('./save');
var wmData = [];
var data;

function crawl(data){
  var crawler = require('./'+data.storeID);
   crawler.crawl(data, function( data ){
      // save data to db
      saveToDB(data);
    });

}

function wmCallback () {

  // slow down for walmart
  var getWMData = function(i) {
    return function () {
      var crawler = require('./wm');
      crawler.crawl(wmData[i], function( data ){
        // save data to db
        saveToDB(data);
      });
      //console.log(wmData[i]);
 
    };
  };

  // make 5 wm calls per second
  for (var i = 1; i <= wmData.length; i++) {
    setTimeout(getWMData(i-1), 200 * i );
  }

}

exports.update = function (callback) {
    db.view('query/all', function  (err, res) {
      
      if (!err) {
          
          var products = res.rows;
          console.log('======================test');
          console.log(products);

          for (var i = 0 ; i < products.length; i++) {

            data = {
              id         : products[i].id,
              storeID    : products[i].value.store_id,
              myPrice    : products[i].value.my_price,
              status     : products[i].value.status,
              //  upperLimit : 0,
              // lowerLimit : 0
              upperLimit : products[i].value.upper_limit,
              lowerLimit : products[i].value.lower_limit

            };

            if( data.storeID === 'wm' ){
              wmData.push(data);
            } else {
              crawl(data);
            }

          } // end for

      } else {
        console.log('Error during quering the db');
      }
    
    // run walmart crawlers
    wmCallback();
    // run update
    callback( err, res );
  });
  
};


