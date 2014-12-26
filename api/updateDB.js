var db = require('./db');
var wmData = [];
var data;

function crawl(data){
  require('./'+data.storeID).crawl(data);
}

function wmCallback () {

  // slow down for walmart
  var getWMData = function(i) {
    return function () {
      require('./wm').crawl(wmData[i]);
    };
  };

  // make 5 wm calls per second
  for (var i = 1; i <= wmData.length; i++) {
    setTimeout(getWMData(i-1), 200 * i );
  }

}

db.view('queries/update', function  (err, res) {

  var products = res.rows;

  for (var i = 0 ; i < products.length; i++) {

    data = {
      id        : products[i].id,
      minProfit : products[i].value.minProfit,
      storeID   : products[i].value.storeID,
      myPrice   : products[i].value.myPrice
    };

    if( data.storeID === 'wm' ){
      wmData.push(data);
    } else {
      crawl(data);
    }

  }

  wmCallback();

});
