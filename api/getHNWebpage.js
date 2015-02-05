
// npm dependencies
var request = require("request");



exports.crawl = function(req, showBody){
  var id = req.param('id');

  requestOptions = {
    url : url = 'http://search.hayneedle.com/search/null.cfm?Ntt='+id,
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
    showBody(body);
    
  });
};
