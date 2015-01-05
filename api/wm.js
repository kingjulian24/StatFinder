var secret = require('../../secret');
var data = '';
var request = require('request');
var save = require('./save');
var url = '';
var key = secret.wmApiKey;
var storeName = 'Walmart',
    storeID   = 'wm';


exports.crawl = function(formData){
  url = 'http://walmartlabs.api.mashery.com/v1/items/'+formData.id+'?format=json&apiKey='+key;
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {

      data             = JSON.parse(body); // Print the google web page.

      data.id          = formData.id;
      data.myPrice     = formData.myPrice;
      data.minProfit   = formData.minProfit;
      data.storePrice  = data.salePrice || 'Not Available';
      data.image       = data.thumbnailImage;
      data.stock       = data.availableOnline;
      data.link        = data.productUrl;
      data.storeName   = storeName;
      data.storeID     = storeID;
      data.title       = data.name || 'Not Available';

      save(data);
    }
  });
};
