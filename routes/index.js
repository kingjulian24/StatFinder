var renderDash = require('../api/renderDash');
var express        = require('express');
var router         = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  req.method = 'get';
  res.redirect('/dash');
 
});

router.get('/dash', function (req,res){
  // Check to see if user is logged in
  if (req.session.passport.user !== undefined) {
    // Render dashboard template with loggeIn set to true and dbview dash
    renderDash(req,res, {dbView: 'dash', loggedIn: true});
  } else {
    // Render dashboard template with loggeIn set to false
    renderDash(req,res, {dbView: 'dash', loggedIn: false});
  }

});

router.get('/dash/all', function (req,res){

  // Check to see if user is logged in
  if (req.session.passport.user !== undefined) {
    // Render dashboard template with loggeIn set to true and dbview all
    renderDash(req,res, {dbView: 'all', loggedIn: true});
  } else {
    // Render dashboard template with loggeIn set to false
    renderDash(req,res, {dbView: 'all', loggedIn: false});
  }
});

router.post('/save', function(req,res){
  // Check to see if user is logged in
  if (req.session.passport.user !== undefined) {

    // save form data
    var data = {
      id                 : req.param('id'),
      storeName          : req.param('store'),
      minProfit          : req.param('min-profit'),
      myPrice            : req.param('my-price'),
      OutOfStockVerified : req.param('out-of-stock-verified'),
      InStockVerified    : req.param('in-stock-verified')
    };
    // crawl using form data
    require('../api/'+data.storeName).crawl( data );
    
    // return to previous page with feedback
    req.method = 'get';
    res.status(200).redirect('/'+req.param('loc')+'?id='+data.id+'&action='+req.param('action'));

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
  // Check to see if user is logged in
  if (req.session.passport.user !== undefined) {
    // If logged in delete product using id
    var id = req.param('id');
    require('../api/delete')(id,req,res);
  } else {
    res.redirect('/login');
  }
});


module.exports = router;
