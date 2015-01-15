
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











