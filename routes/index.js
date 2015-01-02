var renderProductsDash = require('../api/renderProductsDash');
var express        = require('express');
var router         = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  req.method = 'get';
  res.redirect('/dash');
});

router.get('/dash', function (req,res){
  if (req.session.passport.user !== undefined) {
    renderProductsDash(req,res, {view: 'dash', loggedIn: true});
  } else {
    renderProductsDash(req,res, {view: 'dash', loggedIn: false});
  }
});

router.get('/dash/all', function (req,res){
  if (req.session.passport.user !== undefined) {
    renderProductsDash(req,res, {view: 'all', loggedIn: true});
  } else {
    renderProductsDash(req,res, {view: 'all', loggedIn: false});
  }
});

router.post('/save', function(req,res){
  if (req.session.passport.user !== undefined) {
    console.log(req.param('out-of-stock-verified'));

    var data = {
      id                 : req.param('id'),
      storeName          : req.param('store'),
      minProfit          : req.param('min-profit'),
      myPrice            : req.param('my-price'),
      OutOfStockVerified : req.param('out-of-stock-verified'),
      InStockVerified    : req.param('in-stock-verified')
    };
    require('../api/'+data.storeName).crawl(data);

    req.method = 'get';
    res.redirect('/'+req.param('loc')+'?id='+data.id+'&action='+req.param('action'));

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
