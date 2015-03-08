var id, sid;

exports.init = function(req) {
	id = req.param('id');
	sid = req.param('sid');
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



