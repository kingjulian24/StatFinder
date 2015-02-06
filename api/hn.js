//'use strict';
var Parser, request, config, url;
var mergeData   = require('./mergeData');
var STORE_ID    = 'hn';
var STORE_NAME  = 'Hayneedle';

// npm dependencies
Parser  = require("jq-html-parser");
request = require("request");

// config, etc.
config = {
  
  storePrice: {
    selector: 'meta[property="og:price:amount"]',
    attribute: 'content'
  },
  title: {
    selector: 'meta[property="og:title"]',
    attribute: 'content'
  },
  link: {
    selector: 'meta[property="og:url"]',
    attribute: 'content'
  },
  image: {
    selector: 'meta[property="og:image"]',
    attribute: 'content'
  },
  description: {
    selector: 'meta[property="og:description"]',
    attribute: 'content'
  }


};

exports.crawl = function(formData, callback){

  // request options
  requestOptions = {
    url : url = 'http://search.hayneedle.com/search/null.cfm?Ntt='+formData.id,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36'
    }
  };

  // request a page
  request.get(requestOptions, function( err, res, body ) {

      // handle error and non-200 response here
      if(err || (res.statusCode !== 200)){
        return console.log("Hayneedle request failed");
      }

      var parser, data;
      // parse body
      parser         = new Parser(config);
      data           = parser.parse(body);
      data.stock     = parseInt(data.storePrice, 10) > 0 ? true : false;
      data.storeID   = STORE_ID;
      data.storeName = STORE_NAME;
     
      // merge crawl data and form data
      mergeData.init( data, formData, function( data ) {
        callback(data);
      });
    
  });

};
