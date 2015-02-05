//'use strict';
var Parser, request, config, url;
var save = require('./save');
var storeName = 'Hayneedle',
    storeID   = 'hn';


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

exports.crawl = function(formData){

  requestOptions = {
    url : url = 'http://search.hayneedle.com/search/null.cfm?Ntt='+formData.id,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36'
    }
  };


  // request a page
  request.get(requestOptions, function(err, res, body){

    // handle error and non-200 response here
    if(err || (res.statusCode !== 200)){
      return console.log("Hayneedle request failed");
    }

  
    //console.log(body);
    var parser, data;

    // parse body
    parser         = new Parser(config);
    data           = parser.parse(body);
    data.id          = formData.id;
    data.myPrice     = formData.myPrice;
    data.storePrice  = data.storePrice  || 'Not Available';
    data.image       = data.image;
    data.stock       = parseInt(data.storePrice, 10) > 0 ? true : false;
    data.link        = data.link;
    data.storeName   = storeName;
    data.storeID     = storeID;
    data.upperLimit  = formData.upperLimit;
    data.lowerLimit  = formData.lowerLimit;
    data.status      = formData.status;
    data.title       = data.title  || 'Not Available';

    // save to couchdb
    save(data);



  });
};
