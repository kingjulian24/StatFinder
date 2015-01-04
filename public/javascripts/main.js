(function(){
  /* global $: flase */
  var listeners        = require('./listeners.js');
  var search           = require('./search.js');
  var sickyHeader      = require('./stickyHeader.js');
  var sortTableHeaders = require('./sortTableHeaders.js');
  var helpers          = require ('./helpers.js');

  // enable sticky header
  sickyHeader();

  // initialize table listeners
  listeners.init({
    $tblData        : $('.tble-data'),
    $modalContainer : $('.p-modal')
  });

  //intialize search
  search();

  // add table listerners
  listeners.addNewProductBtnListener();
  listeners.tblDataListener();

  // add sort links to table headers
  sortTableHeaders.addAllLinks();

  // fadeOut feedback if any
  helpers.fadeOutFeedback();


})(); // end of self invoking function
