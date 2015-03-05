var db = require('./db');
var saveToDB = require('./save');
var data;
var storeData = {
  hn:[],
  wm:[],
  wf:[]
};


function crawl(data){
  var crawler = require('./'+data.storeID);
   crawler.crawl(data, function( data ){
    console.log('----Retrieving '+ data.store_name +' Data.....');
      // save data to db
      saveToDB(data);
    });
}

//test crawl w/o walmart
function dCrawl(id,data) {
  require('./'+id).crawl(data, function( data ){
    console.log('----Retrieving '+ data.store_name +' Data.....');
      // save data to db
      saveToDB(data);
  });
}

function getCrawler (data) {
  return function () { crawl(data); };
}

function crawlSlow (data, x) {
  return setTimeout( getCrawler(data) , x * 500 );
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

          // populate arrays
          switch(data.storeID) {
            case 'hn':
              storeData.hn.push(data);
              break;
            case 'wf':
              storeData.wf.push(data);
              break;
            case 'wm':
              storeData.wm.push(data);
            break;
          }

          // crawl site using data
            //crawlSlow(data, currentCount);
          

        } // end for

      } else {
        console.log('Error during quering the db');
      } // end else
      for(var h = 0; h < storeData.hn.length; h++) {
        //crawlSlow(storeData.wf[h], h+1);
        dCrawl('wf',storeData.hn[h]);
      }
      for(var f = 0; f < storeData.wf.length; f++) {
        //crawlSlow(storeData.wf[h], h+1);
        dCrawl('wf',storeData.wf[f]);
      }
      for(var m = 0; m < storeData.wm.length; m++) {
        crawlSlow(storeData.wm[m], m+1);
      }
      
      

    // run update
    callback( err, 'done: from update.js' );
  });
  
};


