var data,
  req = require('request'),
  Parser  = require("jq-html-parser"),
  secret = require('../../../secret');

var parseData = function (sid, body) {

    data             = {};
    wmData           = JSON.parse(body);
    data.stock       = wmData.availableOnline;
    data.storeName   = 'Walmart';
    data.storeID     = sid;
    data.storePrice  = wmData.salePrice || 'Not Available';
    data.image       = wmData.thumbnailImage;
    data.stock       = wmData.availableOnline;
    data.link        = wmData.productUrl;
    data.title       = wmData.name || 'Not Available';
    data.description = wmData.shortDescription;
    return data;
};

var getReqOptions = function(id) {
  var reqOptions = {
    url: 'http://walmartlabs.api.mashery.com/v1/items/'+ id +'?format=json&apiKey=' + secret.wmApiKey,
    headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36'
      }
  };
  return reqOptions;
};

exports.sendRequest =  function(config,cb) {
    var reqOptions = getReqOptions(config.id);

    req.get(reqOptions, function(err, res, body){
       if(!err && res.statusCode === 200) {
         cb({
            error : false,
            data  : parseData(config.sid, body)
         });
       } else {
          cb({
            error : true,
            data  : {}
         });
       }
    });
  };