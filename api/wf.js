var Parser, request, config, url;
var mergeData   = require('./mergeData');
var STORE_NAME = 'Wayfair',
    STORE_ID   = 'wf';


// npm dependencies
Parser  = require('jq-html-parser');
request = require('request');

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
    },
    stock: {
      selector: 'link[itemprop="availability"]',
      attribute: 'href'
    }

};


exports.crawl = function (formData, callback) {
    url = 'http://www.wayfair.com/keyword.php?keyword=' + formData.id + '&ust=&command=dosearch&new_keyword_search=true';

    // request a page
    request.get(url, function (err, res, body) {

      // handle error and non-200 response here
    if (err || (res.statusCode !== 200)) {
        return console.log('Wayfair request failed');
    }

      var parser, data;
      // parse body
      parser         = new Parser(config);
      data           = parser.parse(body);
      data.stock     = (data.stock === 'http://schema.org/InStock') > 0 ? true : false;
      data.storeID   = STORE_ID;
      data.storeName = STORE_NAME;
     
      // merge crawl data and form data
      mergeData.init( data, formData, function( data ) {
        callback(data);
      });

    });
};
