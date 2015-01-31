
var express        = require('express');
var router         = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  
  if (req.session.passport.user !== undefined) {
    res.render('index',{view: 'dash', loggedIn: true});
  } else {
    res.render('index',{view: 'dash', loggedIn: false});
  }
});

// data api
router.get('/getProductsData', function(req, res) {
  require('../api/getStats').init(function(stats){
    res.jsonp(stats);
  }); 
});


router.post('/save', function(req,res){
  if (req.session.passport.user !== undefined) {

    var data = {
      id        : req.param('id'),
      storeName : req.param('store'),
      minProfit : req.param('min-profit'),
      myPrice   : req.param('my-price')
    };

    require('../api/'+data.storeName).crawl(data);

    req.method = 'get';
    res.redirect('/?id='+data.id+'&action='+req.param('action'));

  } else {
    res.redirect('/login');
  }
});

router.get('/login', function(req, res){
  res.render('login', { message: req.flash('loginMessage') });
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


router.post('/delete', function(req,res){
  if (req.session.passport.user !== undefined) {
    var id = req.param('id');
    require('../api/delete')(id,req,res);
  } else {
    res.redirect('/login');
  }
});


module.exports = router;
