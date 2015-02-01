var db = require('./db');

module.exports = function(data) {
  var sp        = parseInt(data.storePrice),
      mp        = parseInt(data.myPrice);

  // limits
  var upperLimit = data.upperLimit + mp;
  var lowerLimit = data.lowerLimit - mp;
  var deviated = ( (sp >= upperLimit) || (sp <= lowerLimit) ) ? true : false;

  // data to be saved
  var saveData = {
    _id         : data.id,
    title       : data.title,
    store_name  : data.storeName,
    my_price    : parseInt(data.myPrice),
    store_price : parseInt(data.storePrice),
    upper_limit : data.upperLimit,
    lower_limit : data.lowerLimit,
    description : data.description,
    image       : data.image,
    link        : data.link,
    instock     : data.stock,
    deviated    : deviated,
    store_id    : data.storeID,
    timestamp   : new Date().getTime(),
    osv         : data.osv
  };

  db.save( saveData,
    function  (err, res) {
      if (err){
        console.log('failed to save '+data.id);
      } else {
        console.log('saved: '+data.storeName+', '+data.id);
        console.log('Data: ');
        console.log(saveData);
      }
  });
};
