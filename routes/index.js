var renderProducts = require('../api/renderProducts');
var express        = require('express');
var router         = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  req.method = 'get';
  res.redirect('/dash');
});

router.get('/dash', function (req,res){
  renderProducts(req,res, 'dash');
});

router.get('/dash/all', function (req,res){
  renderProducts(req,res, 'all');
});

router.post('/save', function(req,res){
  var data = {
    id        : req.param('id'),
    storeName : req.param('store'),
    minProfit : req.param('min-profit'),
    myPrice   : req.param('my-price')
  };
  require('../api/'+data.storeName).crawl(data);

  req.method = 'get';
  res.redirect('/'+req.param('loc')+'?id='+data.id+'&action='+req.param('action'));


});


router.post('/delete', function(req,res){
  var id = req.param('id');
  require('../api/delete')(id,req,res);
});


module.exports = router;
