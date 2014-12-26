(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/julianbrown/Desktop/demo/public/javascripts/helpers.js":[function(require,module,exports){
exports.getParameterByName = function (name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};



							
},{}],"/Users/julianbrown/Desktop/demo/public/javascripts/idCheck.js":[function(require,module,exports){
function idCheck (id,store) {
	
	if (id.length === 8 && store === 'wm' ) {
		return true;
	}
	if (id.length === 9 && store === 'hn') {
		return true;
	}
	if (id.length === 6  && store === 'wf') {
		return true;
	}

	return false;
	
}

module.exports = idCheck;
},{}],"/Users/julianbrown/Desktop/demo/public/javascripts/layouts.js":[function(require,module,exports){
// new modal
exports.blankModal = function (title){
  return '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title" id="myModalLabel">'+title+'</h4> </div><div class="modal-body"> </div><div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> </div></div></div></div>';
};


// source/edit/delete modal
exports.modal =   function (data) {
  /*jshint multistr: true */
  var profit = parseInt(data.myPrice) - parseInt(data.storePrice);

  var layout = '\
    <div class="modal fade" id="myModal">\
      <div class="modal-dialog">\
        <div class="modal-content">\
          <div class="modal-header">\
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span>\
            </button>\
            <h4 class="modal-title">'+data.title+'</h4> \
          </div>\
          <div class="modal-body">\
            <div class="row">\
              <div class="col-xs-4">\
                <img src="'+data.image+'" class="img-responsive" />\
              </div>\
              <div class="col-xs-8">\
                <p><strong>StorePrice: </strong>$'+data.storePrice+'</p>\
                <p><strong>My Price: </strong>$'+data.myPrice+'</p>\
                <p><strong>Profit: </strong>$'+profit+'</p>\
                <p><strong>Description: </strong>'+data.description+'</p>\
              </div>\
            </div>\
          </div>\
          <div class="modal-footer">\
            <button type="button" class="btn btn-default view-source-btn">View Source</button>\
            <button type="button" class="btn btn-default  edit-btn">Edit</button>\
          </div>\
        </div>\
      </div>\
    </div>';

  return layout;
};

exports.productBodyModal = function (data) {
    var profit = parseInt(data.myPrice) - parseInt(data.storePrice);
    /*jshint multistr: true */
    var layout = '\
    <div class="row">\
      <div class="col-xs-4">\
        <img src="'+data.image+'" class="img-responsive" />\
      </div>\
      <div class="col-xs-8">\
        <p><strong>StorePrice: </strong>$'+data.storePrice+'</p>\
        <p><strong>My Price: </strong>$'+data.myPrice+'</p>\
        <p><strong>Profit: </strong>$'+profit+'</p>\
        <p><strong>Description: </strong>'+data.description+'</p>\
      </div>\
    </div>';
    return layout;
  };

  exports.iframeBody = function (data) {
    /*jshint multistr: true */
    var layout = '<div id="loading"><img src="http://www.windowdesigngroup.com/images/loading.gif" /></div>\
    <iframe src="'+data.link+'" style="width: 100%; height: 600px;">\
    <p>Your browser does not support iframes.</p>\
    </iframe>';

    return layout;
  };


  exports.editForm = function  (data,config) {
    var layout;
    if(config.new){
      layout = '<form class="form-horizontal new-product-form" action="/save?loc='+config.loc+'&action=Added" method="post"> <fieldset> <legend>Add New Product</legend> <div class="form-group"> <label class="col-md-4 control-label" for="id">Product ID</label> <div class="col-md-6"> <input id="id" name="id" type="text" placeholder="Enter product id" class="form-control input-md" required=""> </div></div><div class="form-group"> <label class="col-md-4 control-label" for="store">Store</label> <div class="col-md-6"> <select id="store" name="store" class="form-control"> <option value="">Select</option> <option value="hn">Hayneedle</option> <option value="wm">Walmart</option> <option value="wf">Wayfair</option> </select> </div></div><div class="form-group"> <label class="col-md-4 control-label" for="price">Your Price</label> <div class="col-md-6"> <input id="price" name="my-price" type="number" placeholder="Enter your price" class="form-control input-md" required=""> </div></div><div class="form-group"> <label class="col-md-4 control-label" for="limit">Min Profit</label> <div class="col-md-6"> <input id="min-profit" name="min-profit" type="text" placeholder="Enter minimum profit" class="form-control input-md" required=""> </div></div><div class="form-group"> <label class="col-md-4 control-label" for="submit"></label> <div class="col-md-6"> <button id="submit" type="submit" name="submit" class="btn btn-success">Submit</button> </div></div></fieldset> </form>';
    } else {
      layout = '<form class="form-horizontal new-product-form" action="/save?loc='+config.loc+'&action=Updated" method="post"> <fieldset> <legend>Product Price: '+data.storePrice+'</legend> <div class="form-group"> <label class="col-md-4 control-label" for="id">Product ID</label> <div class="col-md-6"> <input id="id" name="id" type="text" placeholder="Enter product id" class="form-control input-md" value="'+data.id+'"required=""> </div></div><div class="form-group"> <label class="col-md-4 control-label" for="store">Store</label> <div class="col-md-6"> <select id="store" name="store" class="form-control"> <option value="'+data.storeID+'">'+data.storeName+'</option> </select> </div></div><div class="form-group"> <label class="col-md-4 control-label" for="price">Your Price</label> <div class="col-md-6"> <input id="price" name="my-price" type="number" placeholder="Enter your price" class="form-control input-md" value="'+data.myPrice+'" required=""> </div></div><div class="form-group"> <label class="col-md-4 control-label" for="limit">Min Profit</label> <div class="col-md-6"> <input id="min-profit" name="min-profit" type="text" placeholder="Enter minimum profit" class="form-control input-md" value="'+data.minProfit+'" required=""> </div></div><div class="form-group"> <label class="col-md-4 control-label" for="submit"></label> <div class="col-md-6"> <button id="submit" type="submit" name="submit" class="btn btn-success">Submit</button> </div></div></fieldset> </form>';
    }
    return layout;
  };

},{}],"/Users/julianbrown/Desktop/demo/public/javascripts/listeners.js":[function(require,module,exports){
/* global $: flase, confirm: false */
var loc       = require('./loc.js');
var layouts   = require('./layouts.js');
var idCheck   = require('./idCheck.js');

module.exports = {

  init: function (config) {

    this.$tblData         = config.$tblData;
    this.$modalContainer = config.$modalContainer;

  },
  resetModal: function(layout) {
    // clear modal & add new modal
    this.$modalContainer.html('').
        append(layout);

  },
  resetModalBody: function(layout) {

    // delete modal body and add new body
    this.$modalBody.html('').
    append(layout);

  },
  tblDataListener: function () {
    var self = this;
    // product row listener
    this.$tblData.on('click', function(){

      // save tblData data
      self.$currentRowData = $(this).parent().data("data");

      // reset modal
      self.resetModal(layouts.modal(self.$currentRowData));

      // save new elements
      self.$editBtn = $('.edit-btn');
      self.$viewSrcBtn = $('.view-source-btn');

      // show modal
      $('#myModal').modal('show');


      // save modal body
      self.$modalBody = $('.modal-body');

      // add listener for new modal
      self.editBtnListener();
      self.srcBtnListener();

    });

  },
  editBtnListener: function () {
    var self = this;
    this.$editBtn.on('click', function(){
      //change edit btn to back btn
      $(this).html('Back').
      addClass('back-btn').
      removeClass('edit-btn').
      blur().
      after('<form class="delete-form" action="/delete?loc='+ loc +'&id='+ self.$currentRowData.id +'" style="display:inline;" method="post"><button type="submit" class="btn btn-default delete-btn">Delete</button></form>'); // add delete btn

      // save new elements
      self.$deleteBtn = $('.delete-btn');
      self.$deleteForm = $('.delete-form');
      self.$bkBtn = $('.back-btn');

      // remove source btn
      self.$viewSrcBtn.remove();

      // reset modal with edit form
      self.resetModalBody(layouts.editForm( self.$currentRowData, { new: false , loc: loc } ));

      self.bkBtnFromEditListener();
      self.deleteFormListener();

    });
  },
  deleteFormListener: function() {
    // delete confirmation
    this.$deleteForm.on('submit',function(){
      return confirm('Are you sure?');
    });
  },
  newProductFormListener: function  () {
    $('.new-product-form').on('submit', function () {

      var id = $('.new-product-form #id').val(),
        store = $('.new-product-form #store').val();


        if(!idCheck(id, store)){
          $('.modal-title').html('').
            append(
              $('<h3>', {
                text: 'Sorry, wrong id/store combination',
                class: 'alert bg-danger'
              })
            );
          return false;
        }
    });
  },
  bkBtnFromEditListener: function () {
    var self = this;
    this.$bkBtn.on('click',function (){

      // change edit btn to back btn
      $(this).html('Edit').
      addClass('edit-btn').
      removeClass('back-btn').
      blur().
      before('<button type="button" class="btn btn-default view-source-btn">View Source</button>');

      // save new elements
      self.$editBtn = $('.edit-btn');
      self.$viewSrcBtn = $('.view-source-btn');

      // remove delete btn
      self.$deleteBtn.remove();

      self.resetModalBody(layouts.productBodyModal(self.$currentRowData));

      // liseten for new elements
      self.editBtnListener();
      self.srcBtnListener();
    });
  },
  bkBtnFromSrcListener: function () {
    var self = this;
    this.$bkBtn.on('click',function (){

      // change edit btn to back btn
      $(this).html('View Source').
      addClass('view-source-btn').
      removeClass('back-btn').
      blur().
      after('<button type="button" class="btn btn-default edit-btn">Edit</button>');

      // save new elements
      self.$editBtn = $('.edit-btn');
      self.$viewSrcBtn = $('.view-source-btn');

      // delete modal body and add new body
      self.resetModalBody(layouts.productBodyModal(self.$currentRowData));

      // liseten for new elements
      self.editBtnListener();
      self.srcBtnListener();
    });
  },
  addNewProductBtnListener: function () {
    var self = this;
    $('.add-new-product').on('click',function(){
      self.$modalContainer.html(''). // reset modal
      append(layouts.blankModal('NEW'));
      $('.modal-body').append(layouts.editForm({},{new:true, loc:loc}));
      $('#myModal').modal('show');

      self.newProductFormListener();
    });
  },
  srcBtnListener: function () {
    var self = this;

    this.$viewSrcBtn.on('click', function(){

      // add back button
      $(this).html('Back').
      addClass('back-btn').
      removeClass('view-source-btn').
      blur();

      //remove edit btn
      self.$editBtn.remove();

      // reset modal body and add iframe
      self.resetModalBody(layouts.iframeBody(self.$currentRowData));

      // save new elements
      self.$bkBtn = $('.back-btn');


      self.bkBtnFromSrcListener();
      self.iframeOnLdListener();

    });
  },
  iframeOnLdListener: function () {
    $('iframe').on('load', function(){
      $('#loading').remove();
    });
  }

};

},{"./idCheck.js":"/Users/julianbrown/Desktop/demo/public/javascripts/idCheck.js","./layouts.js":"/Users/julianbrown/Desktop/demo/public/javascripts/layouts.js","./loc.js":"/Users/julianbrown/Desktop/demo/public/javascripts/loc.js"}],"/Users/julianbrown/Desktop/demo/public/javascripts/loc.js":[function(require,module,exports){

module.exports = $('.active').data('page');

},{}],"/Users/julianbrown/Desktop/demo/public/javascripts/main.js":[function(require,module,exports){
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

},{"./listeners.js":"/Users/julianbrown/Desktop/demo/public/javascripts/listeners.js","./search.js":"/Users/julianbrown/Desktop/demo/public/javascripts/search.js","./sortTableHeaders.js":"/Users/julianbrown/Desktop/demo/public/javascripts/sortTableHeaders.js","./stickyHeader.js":"/Users/julianbrown/Desktop/demo/public/javascripts/stickyHeader.js"}],"/Users/julianbrown/Desktop/demo/public/javascripts/search.js":[function(require,module,exports){
function resetSearch ($row, bgColor) {

  setTimeout(function() {
    $row.css({
      background: bgColor
    });
  },3000);
}

function search (){
  $('.navbar-form').on('submit',function(e){
    var $row = $( '#' + $('.search-input').val() );
    var bgColor = $row.css('background');

    // highlight row
    $row.css({
      background: 'red'
    });

    // scroll to row
    $('html, body').animate({
      scrollTop: ($row.offset().top - 110)
    }, 1000);

    // prevent submit default behavior
     e.preventDefault();
    //
    // remove background within 3 seconds
    resetSearch($row, bgColor);
  });
}

module.exports = search;

},{}],"/Users/julianbrown/Desktop/demo/public/javascripts/sortTableHeaders.js":[function(require,module,exports){
var loc = require('./loc.js');
var helpers = require('./helpers.js');

function addSortingLinks(data) {
	console.log(data);
  var desc = helpers.getParameterByName('desc');
  
  if(desc !== undefined) {

    if(desc === 'true'){
      $(data.header).attr('href','/'+loc+'?view='+data.view);
    } else {
      $(data.header).attr('href','/'+loc+'?view='+data.view+'&desc=true');
    }
  } else {
  	//console.log('test');
    $(data.header).attr('href','/'+loc+'?view='+data.view);
  
  }

}


// function addSortedTableHeaders (data) {

//   for (var i = 0; i < data.length; i++) {
//     addSortingLinks({
//       header: data[i].header,
//       view: data[i].view
//     });
//   }
// }

var addAllLinks = function () {

	var headerArray = $('thead tr th').not('.delete-head');
	var hid;
	var hview;
	var header;
	var headerData;

	for(var i = 0; i < headerArray.length/2; i++) {
	  header = $(headerArray[i]);

	  if(header.attr('class') !== undefined) {
	    
	    hid = '.'+header.attr('class')+' a';
	    hview = header.data('view');
	    
	    headerData = {
	      header: hid,
	      view: hview
	    };
	    
	    addSortingLinks(headerData);
	    //console.log(headerData);
	  }

	}
};

exports.addAllLinks = addAllLinks;







},{"./helpers.js":"/Users/julianbrown/Desktop/demo/public/javascripts/helpers.js","./loc.js":"/Users/julianbrown/Desktop/demo/public/javascripts/loc.js"}],"/Users/julianbrown/Desktop/demo/public/javascripts/stickyHeader.js":[function(require,module,exports){
module.exports = function(){
	 
	$('table').each(function() {
		if($(this).find('thead').length > 0 && $(this).find('th').length > 0) {
			// Clone <thead>
			var $w	   = $(window),
				$t	   = $(this),
				$thead = $t.find('thead').clone(),
				$col   = $t.find('thead, tbody').clone();

			// Add class, remove margins, reset width and wrap table
			$t
			.addClass('sticky-enabled')
			.css({
				margin: 0,
				width: '100%'
			}).wrap('<div class="sticky-wrap" />');

			if($t.hasClass('overflow-y')) $t.removeClass('overflow-y').parent().addClass('overflow-y');

			// Create new sticky table head (basic)
			$t.after('<table class="sticky-thead" />');

			// If <tbody> contains <th>, then we create sticky column and intersect (advanced)
			if($t.find('tbody th').length > 0) {
				$t.after('<table class="sticky-col" /><table class="sticky-intersect" />');
			}

			// Create shorthand for things
			var $stickyHead  = $(this).siblings('.sticky-thead'),
				$stickyCol   = $(this).siblings('.sticky-col'),
				$stickyInsct = $(this).siblings('.sticky-intersect'),
				$stickyWrap  = $(this).parent('.sticky-wrap');

			var headerAjustment = 50;


			$stickyHead.append($thead);

			$stickyCol
			.append($col)
				.find('thead th:gt(0)').remove()
				.end()
				.find('tbody td').remove();

			$stickyInsct.html('<thead><tr><th>'+$t.find('thead th:first-child').html()+'</th></tr></thead>');
			


			// Set widths
			var setWidths = function () {
					$t
					.find('thead th').each(function (i) {
						$stickyHead.find('th').eq(i).width($(this).width());
					})
					.end()
					.find('tr').each(function (i) {
						$stickyCol.find('tr').eq(i).height($(this).height());
					});

					// Set width of sticky table head
					$stickyHead.width($t.width());

					// Set width of sticky table col
					$stickyCol.find('th').add($stickyInsct.find('th')).width($t.find('thead th').width());
				},
				repositionStickyHead = function () {

					// Return value of calculated allowance
					var allowance = calcAllowance();
				
					// Check if wrapper parent is overflowing along the y-axis
					if($t.height() > $stickyWrap.height()) {

						// If it is overflowing (advanced layout)
						// Position sticky header based on wrapper scrollTop()
						if($stickyWrap.scrollTop() > 0) {
							// When top of wrapping parent is out of view
							$stickyHead.add($stickyInsct).css({
								opacity: 1,
								top: $stickyWrap.scrollTop()
							});
						} else {

							// When top of wrapping parent is in view
							$stickyHead.add($stickyInsct).css({
								opacity: 0,
								top: 0 
							});
						}
					} else {

						// If it is not overflowing (basic layout)
						// Position sticky header based on viewport scrollTop
						if($w.scrollTop() > $t.offset().top && $w.scrollTop() < $t.offset().top + $t.outerHeight() - allowance) {
							// When top of viewport is in the table itself
							$stickyHead.add($stickyInsct).css({
								opacity: 1,
								top: ($w.scrollTop() - $t.offset().top) + headerAjustment,
								transition: 'top .7s'
							});

						} else {
							// When top of viewport is above or below table
							$stickyHead.add($stickyInsct).css({
								opacity: 0,
								top: 0
							});
						}
					}
				},
				repositionStickyCol = function () {
					if($stickyWrap.scrollLeft() > 0) {
						// When left of wrapping parent is out of view
						$stickyCol.add($stickyInsct).css({
							opacity: 1,
							left: $stickyWrap.scrollLeft()
						});
					} else {
						// When left of wrapping parent is in view
						$stickyCol
						.css({ opacity: 0 })
						.add($stickyInsct).css({ left: 0 });
					}
				},
				calcAllowance = function () {
					var a = 0;
					// Calculate allowance
					$t.find('tbody tr:lt(3)').each(function () {
						a += $(this).height();
					});
					
					// Set fail safe limit (last three row might be too tall)
					// Set arbitrary limit at 0.25 of viewport height, or you can use an arbitrary pixel value
					if(a > $w.height()*0.25) {
						a = $w.height()*0.25;
					}
					
					// Add the height of sticky header
					a += $stickyHead.height();
					return a;
				};

			setWidths();

			$t.parent('.sticky-wrap').scroll($.throttle(250, function() {
				repositionStickyHead();
				repositionStickyCol();
			}));

			$w
			.load(setWidths)
			.resize($.debounce(250, function () {
				setWidths();
				repositionStickyHead();
				repositionStickyCol();
			}))
			.scroll($.throttle(250, repositionStickyHead));
		}
	});
};
},{}]},{},["/Users/julianbrown/Desktop/demo/public/javascripts/main.js"]);
