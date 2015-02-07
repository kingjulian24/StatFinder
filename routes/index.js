
var express        = require('express');
var router         = express.Router();
var crawlSave      = require('../api/crawlSave');
var updateDB       = require('../api/updateDB');

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

// update db
router.get('/updateDB', function(req, res) {
  // authenticate user
  if (req.session.passport.user !== undefined) {
    // craw and save data to db
    updateDB.update(function( err, response ){
      // send done
      if (!err){
        res.json({len: response.length, res: response});
      } else {
        res.json({error: 'error'});
      }
      
    });
  // if not logged in redirect to login page
  } else {
    res.redirect('/login');
  } 
});

// temp for sf1
router.get('/getHNWebpage', function(req, res) {
  require('../api/getHNWebpage').crawl(req, function(stats){
    res.send(stats);
  }); 
});


router.post('/save', function( req, res ){
  // authenticate user
  if (req.session.passport.user !== undefined) {
    // craw and save data to db
    crawlSave.init(req, function(data){
      // redirect to dash board after data retrieval
      req.method = 'get';
      // add updated product and action to request param
      res.redirect('/?id='+data.id+'&action='+data.action);
    });
  // if not logged in redirect to login page
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
