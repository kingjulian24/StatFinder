var secret = require('../../secret');
var request = require('request');
var mergeData   = require('./mergeData');
var url = '';
var key = secret.wmApiKey;
var STORE_NAME = 'Walmart',
    STORE_ID   = 'wm';


exports.crawl = function(formData, callback){
  url = 'http://walmartlabs.api.mashery.com/v1/items/'+formData.id+'?format=json&apiKey='+key;
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var data;
      data            = JSON.parse(body); 
      data.stock      = data.availableOnline;
      data.storeName  = STORE_NAME;
      data.storeID    = STORE_ID;
      data.storePrice = data.salePrice || 'Not Available';
      data.image      = data.thumbnailImage;
      data.stock      = data.availableOnline;
      data.link       = data.productUrl;
      data.title      = data.name || 'Not Available';


      // merge crawl data and form data
      mergeData.init( data, formData, function( data ) {
        callback(data);
      });

    } else {
      console.log('Walmart request failed');
    }
  });
};
