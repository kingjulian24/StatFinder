var saveToDB = require('./save');
exports.init = function ( req, callback ) {
	 
	 // form data
	 var data = {
      id         : req.param('id')           ,
      storeName  : req.param('store')        ,
      upperLimit : parseInt(req.param('upper-limit'), 10) ,
      lowerLimit : parseInt(req.param('lower-limit'), 10) ,
      status     : req.param('p-status'),
      myPrice    : req.param('my-price'),
      action     : req.param('action') || 'None'
    };


    // retrieve data
    var crawler = require('./'+data.storeName);
    crawler.crawl(data, function( data ){
      console.log('Retrieving '+ data.storeName +' Data.....');
    	// save data to db
    	saveToDB(data);
    });

    // run callback when finish
    callback(data);
};