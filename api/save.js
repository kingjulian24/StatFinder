var db = require('./db');

module.exports = function(data) {
  var sp        = parseInt(data.storePrice),
      mp        = parseInt(data.myPrice),
      minProfit = parseInt(data.minProfit);

  data.profit = ( (mp - sp) >= minProfit ) ? true : false;

  db.save({
    _id         : data.id,
    title       : data.title,
    store_name  : data.storeName,
    my_price    : parseInt(data.myPrice),
    store_price : parseInt(data.storePrice),
    min_profit  : data.minProfit,
    description : data.description,
    image       : data.image,
    link        : data.link,
    instock     : data.stock,
    profit      : data.profit,
    store_id    : data.storeID,
    timestamp   : new Date().getTime(),
    osv         : false
  },
    function  (err, res) {
      if (err){
        console.log('failed to save '+data.id);
      } else {
        console.log(res);
      }
  });
};
