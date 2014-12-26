var Parser, request, config, url, parser, data;
var save = require('./save');
var storeName = 'Wayfair',
    storeID   = 'wf';


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


exports.crawl = function (formData) {
    url = 'http://www.wayfair.com/keyword.php?keyword=' + formData.id + '&ust=&command=dosearch&new_keyword_search=true';

    // request a page
    request.get(url, function (err, res, body) {

        // handle error and non-200 response here
        if (err || (res.statusCode !== 200)) {
            return console.log('An error occured.');
        }

        // parse body
        parser         = new Parser(config);
        data           = parser.parse(body);

        data.id          = formData.id;
        data.myPrice     = formData.myPrice;
        data.minProfit   = formData.minProfit;
        data.storePrice  = data.storePrice  || 'Not Available';
        data.image       = data.image;
        data.stock       = (data.stock === 'http://schema.org/InStock') > 0 ? true : false;
        data.link        = data.link;
        data.storeName   = storeName;
        data.storeID     = storeID;
        data.title       = data.title || 'Not Available';

        save(data);

    });
};
