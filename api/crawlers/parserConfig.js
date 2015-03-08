var config;
module.exports = function (sid) {
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

  // specific for wayfair
  if( sid === 'wf' ) {
  	config. stock = {
  		selector: 'link[itemprop="availability"]',
  		attribute: 'href'
  	};
  }

  return config;
};

