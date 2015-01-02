var db = require('./db');

module.exports = function(data,formData) {
  var sp        = parseInt(data.storePrice),
      mp        = parseInt(formData.myPrice),
      minProfit = parseInt(formData.minProfit);

  data.profit = ( (mp - sp) >= minProfit ) ? true : false;

  db.save({
    _id                   : formData.id,
    title                 : data.title,
    store_name            : data.storeName,
    my_price              : parseInt(formData.myPrice),
    store_price           : parseInt(data.storePrice),
    min_profit            : formData.minProfit,
    description           : data.description,
    image                 : data.image,
    link                  : data.link,
    instock               : data.stock,
    profit                : data.profit,
    store_id              : data.storeID,
    out_of_stock_verified : formData.OutOfStockVerified || 'off',
    in_stock_verified     : formData.InStockVerified || 'off',
    last_updated          : new Date().getTime()
  },
    function  (err, res) {
      if (err){
        console.log('failed to save '+data.id);
      } else {
        console.log(res);
      }
  });
};
