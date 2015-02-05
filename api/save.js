var db = require('./db');

module.exports = function(data) {
  var sp        = parseInt(data.storePrice, 10),
      mp        = parseInt(data.myPrice, 10);

  // limits
  var upperLimit = data.upperLimit + mp;

  var lowerLimit = data.lowerLimit - mp;

  var deviated = ( (sp > upperLimit) || (sp < lowerLimit) ) ? true : false;

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
    status      : data.status
  };

  db.save( saveData,
    function  (err, res) {
      if (err){
        console.log('failed to save '+data.id);
      } else {
        console.log('saved: '+data.storeName+', '+data.id);
        // console.log('Data: ');
         console.log(saveData);
      }
  });
};



// var saveData = {
//     _id         : data.id,
//     title       : data.title,
//     store_name  : data.storeName,
//     my_price    : parseInt(data.myPrice),
//     store_price : parseInt(data.storePrice),
//     upper_limit : 0,
//     lower_limit : 0,
//     description : data.description,
//     image       : data.image,
//     link        : data.link,
//     instock     : data.stock,
//     deviated    : false,
//     store_id    : data.storeID,
//     timestamp   : new Date().getTime(),
//     status      : data.stock ? 'isv' : 'osuv'
//   };
