var req = require('request');
var mergeData   = require('./mergeData');

var formData = {
	id: 123,
	myPrice: 12.99,
	lowerLimit: 0,
	upperLimit: 0,
	status: 'isv'
};

req.get('http://localhost:3000/crawl?id=HN-ALZ257&sid=hn', function(err,res,body){
	mergeData.init( JSON.parse(body),formData, function(data) {
		console.log(data);
	});
});