(function(){
  /* global $: flase */
  var listeners = require('./listeners.js');
  var search    = require('./search.js');
  var sickyHeader = require('./stickyHeader.js');
  var sortTableHeaders =require('./sortTableHeaders.js');

  sickyHeader();

  listeners.init({
    $tblData       : $('.tble-data'),
    $modalContainer : $('.p-modal')
  });

  search();

  listeners.addNewProductBtnListener();
  listeners.tblDataListener();



sortTableHeaders.addAllLinks();



setTimeout(function(){
        $('.updated').fadeOut();
},3000);


})(); // end of self invoking function
