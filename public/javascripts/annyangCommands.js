module.exports = {
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

	  	'reset search' : function () {
	  		$scope.searchText = '';
	  		$('.search').val('');
	  		
	  		$scope.$apply();
	  	},

	  	'search reset' : function () {
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

	  	'hide commands' : function () {
	  		$scope.showCommands = false;
	  		
	  		$scope.$apply();
	  	}

	  };