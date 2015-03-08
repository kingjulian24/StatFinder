var data,
  req = require('request'),
  Parser  = require("jq-html-parser");

var parseData = function (sid, body) {
  var parserConfig = require('./parserConfig')(sid);

  var parser         = new Parser(parserConfig);
  data           = parser.parse(body);
  data.stock     = (data.stock === 'http://schema.org/InStock') > 0 ? true : false;
  data.storeID   = sid;
  data.storeName = 'Wayfair';
  return data;
};

var getReqOptions = function(id) {
  var reqOptions = {
    url: 'http://www.wayfair.com/keyword.php?keyword=' + id + '&ust=&command=dosearch&new_keyword_search=true',
    headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36'
      }
  };
  return reqOptions;
};

exports.sendRequest =  function(config,cb) {
    var reqOptions = getReqOptions(config.id);

    req.get(reqOptions, function(err, res, body){
       if(!err && res.statusCode === 200) {
         cb({
            error : false,
            data  : parseData(config.sid, body)
         });
       } else {
          cb({
            error : true,
            data  : {}
         });
       }
    });
  };
