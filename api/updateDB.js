var db = require('./db');
var saveToDB = require('./save');
var data;

function crawl(data){
  var crawler = require('./'+data.storeID);
   crawler.crawl(data, function( data ){
      // save data to db
      saveToDB(data);
    });
}

function getCrawler (data) {
  return function () { crawl(data); };
}

function crawlSlow (data, x) {
  return setTimeout( getCrawler(data) , x * 200 );
}

exports.update = function (callback) {
    db.view('query/all', function  (err, res) {
      
      if (!err) {
        var wmCount = 0;
        var hnCount = 0;
        var wfCount = 0;
        var currentCount = 0;

        var products = res.rows;

        for (var i = 0 ; i < products.length; i++) {

          data = {
            id         : products[i].id,
            storeID    : products[i].value.store_id,
            myPrice    : products[i].value.my_price,
            status     : products[i].value.status,
            upperLimit : products[i].value.upper_limit,
            lowerLimit : products[i].value.lower_limit
          };

          // set current count
          switch(data.storeID) {
            case 'hn':
              ++hnCount;
              currentCount = hnCount;
              break;
            case 'wf':
              ++wfCount;
              currentCount = wfCount;
              break;
            case 'wm':
              ++wmCount;
              currentCount = wmCount;
            break;
          }

          // crawl site using data
            crawlSlow(data, currentCount);
          
          

        } // end for

      } else {
        console.log('Error during quering the db');
      } // end else

    // run update
    callback( err, res );
  });
  
};


