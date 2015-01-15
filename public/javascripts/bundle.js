(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/julianbrown/Desktop/StatFinder/public/javascripts/main.js":[function(require,module,exports){

var modalHelpers = require('./modalHelpers.js');
var sf = angular.module('sfApp',['ngAnimate','sfSortArrows']);

// custom filter

sf.filter('sfcheck', [function(){
	return function(input){
		return input ? 'fa fa-check' : 'fa fa-exclamation-triangle';
	};
}]);





sf.controller('dashCtrl', ['$scope','$http','$filter','$compile', '$sce', function($scope, $http, $filter, $compile, $sce){

	// let subscribers no that data is loading
	$scope.$emit('LOADING');

	$http.jsonp('/getProductsData?callback=JSON_CALLBACK').success(function(data){
		
	
		$scope.allProductsCount  = data.allProducts.length;
		$scope.outOfStockCount   = data.outOfStock.length;
		$scope.profitLossCount   = data.profitLoss.length;
		$scope.goodProductsCount = data.goodProducts.length;
		$scope.productType 		 = 'badProducts';
		$scope.defaultModalTitle = 'New';


		var orderBy = $filter('orderBy');

		// function to order table
		$scope.order = function (predicate, reverse) {
			$scope.Products = orderBy(data[$scope.productType], predicate, reverse);	
		};

		// default order: store name
		$scope.order('store_name',false);

		// function to filter table by data array
		$scope.filterTable = function (by) { 
			// update product type
			$scope.productType = by;
			// filter and order table
			$scope.order('store_name', false);

		};

		// let subscribers no that data is done loading
		$scope.$emit('DONELOADING');

					
	}).
	  error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    $scope.sfErrorMessage = "Error: Failed to retrieve product data.";
	    $scope.sfError = true;
	  });

		  
	  // annyang voice commands

	  var commands = {
	  	'new product' : function(){
	  		$scope.showModal('newProduct');
	  		$scope.$apply();
	  	},

	  	'sort by title *val' : function (val) {
	  		if (val === 'ascending') {
	  			$scope.order('title', false);
	  		} else {
	  			$scope.order('title', true);
	  		}
	  		
	  		$scope.$apply();
	  	},

	  	'search *val' : function (val) {
	  		$scope.searchText = val;
	  		$('.search').val(val);
	  		
	  		$scope.$apply();
	  	},

	  	'clear search' : function () {
	  		$scope.searchText = '';
	  		$('.search').val('');
	  		
	  		$scope.$apply();
	  	},


	  	'view out of stock' : function () {
	  		$scope.filterTable('outOfStock');
	  		
	  		$scope.$apply();
	  	},

	  	'show commands' : function () {
	  		$scope.showCommands = true;
	  		
	  		$scope.$apply();
	  	},

	  	'hello' : function () {
	  		$scope.showCommands = true;
	  		
	  		$scope.$apply();
	  	},

	  	'hide commands' : function () {
	  		$scope.showCommands = false;
	  		
	  		$scope.$apply();
	  	},
	  	'goodbye' : function () {
	  		$scope.showCommands = false;
	  		
	  		$scope.$apply();
	  	}

	  };

	  //save commands

	  $scope.showCommands = false;
	  $scope.commands = [];
	  var i = 0;
	  for(command in commands){
	  	$scope.commands[i] = command;
	  	i++;
	  }
	  
	  if (annyang) {
		  annyang.addCommands(commands);
		  annyang.debug([newState=true]);
		  annyang.start();
	   }

	  
	  // show modal based on type
	  $scope.showModal = function (type, currentProduct) {
	  	//save current produt
	  	$scope.currentProduct = currentProduct || '';


		// initial modal body templates to false
		$scope.moreInfo       = false;
		$scope.newProduct     = false;
		$scope.editProduct 	  = false;

		// set current template to true
		$scope[type]       = true;


		// set modal to current product title if not new product
		if(!$scope.newProduct) {
			$scope.defaultModalTitle  = $scope.currentProduct.title;
		}


		// switch btns on modal
		modalHelpers.switchBtns(type,$scope, $compile);

		// sanitize link only on moreInfo template
		if(!$scope.editProduct && $scope.backBtn){
	  		// trust link
	  		$scope.currentProduct.link = $sce.trustAsUrl($scope.currentProduct.link);
	  	}

	  	$('#myModal').modal('show');
	

	  };




	  
}]);


sf.controller('loadingCtrl', ['$scope', function($scope){
	$scope.$on('LOADING',function(){
		$scope.loading = true;
	});
	$scope.$on('DONELOADING',function(){
		$scope.loading = false;
	});
}]);












},{"./modalHelpers.js":"/Users/julianbrown/Desktop/StatFinder/public/javascripts/modalHelpers.js"}],"/Users/julianbrown/Desktop/StatFinder/public/javascripts/modalHelpers.js":[function(require,module,exports){

	  // switch btns on modal
	  exports.switchBtns = function  (type, $scope, $compile) {
	  	if(type === 'editProduct') {
	  		
	  		$('.edit-btn').html('Back').
	  			addClass('back-btn').
	  			removeClass('edit-btn').
	  			blur().
	  			attr('ng-click', 'showModal(\'moreInfo\',currentProduct)').
	  			after('<form  ng-click="sfSubmit()" action="/delete?id='+$scope.currentProduct._id+'" method="post" class="delete-form"  style="display:inline;" ><button type="submit" class="btn btn-danger delete-btn">Delete</button></form>');
  				
  			$compile($('.back-btn'))($scope);
  			
  			// form confirmation
  			$('.delete-form').on('submit',function(){
  				return confirm('Are you sure?');
  			});

  			$scope.backBtn = true;

	  	} else if( $scope.backBtn ) {
	  		$('.back-btn').html('Edit').
	  			addClass('edit-btn').
	  			removeClass('back-btn').
	  			blur().
	  			attr('ng-click', 'showModal(\'editProduct\',currentProduct)');
	  			
  				$('.delete-form').remove(); // remove delete button

  			$compile($('.edit-btn'))($scope);
  			$compile($('.delete-form'))($scope);

  			$scope.backBtn = false;
	  	} else if ($scope.newProduct) {
	  		
	  		$('.new-product-form').on('submit', function(){
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
	  	}
	  };

	 function idCheck(id,store) {
	
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
},{}]},{},["/Users/julianbrown/Desktop/StatFinder/public/javascripts/main.js"]);
