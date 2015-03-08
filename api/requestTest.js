var request = require('request');
var secret = require('../../secret');
var key = secret.wmApiKey;
var url, requestOptions;
var id, sid;


exports.init = function(req) {
	id = req.param('id');
	sid = req.param('sid');
	url = {
		hn: 'http://search.hayneedle.com/search/null.cfm?Ntt='+id,
		wf: 'http://www.wayfair.com/keyword.php?keyword=' + id + '&ust=&command=dosearch&new_keyword_search=true',
		wm: 'http://walmartlabs.api.mashery.com/v1/items/'+ id +'?format=json&apiKey=' + key
	};

	requestOptions = {
		url: url[sid],
		headers: {
	        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36'
	    }
	};
};

exports.sendRequest = function( cb ) {
	var crawler = require('./' + sid);
	var config = {
		id: id,
		sid: sid
	}; 
	crawler.sendRequest(config, function(data) {
		if(!data.error) {
			cb(data);
		} else {
			cb(false);
		}
	});

};



