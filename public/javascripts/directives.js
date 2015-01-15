angular.module('sfSortArrows',[]).
 directive('sortarrow', [ function(){

	// Runs during compile
	return {

		scope: {}, // {} = isolate, true = child, false/undefined = no change
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		link: function($scope, iElm, iAttrs, controller) {
				
			iElm.bind('click', function(){

				// reset all head to fa-sorting icon
				$('th a').children().removeClass('fa-sort-down fa-sort-up').addClass('fa-sort');
				
				//sort up
				if(iElm.attr('data-reverse') === 'true'){

					iElm.attr({
						'data-reverse': false
					}).
					children().removeClass('fa-sort fa-sort-down').
					  	addClass('fa-sort-up');
					

				} else { // sort down
					
					iElm.attr({
						'data-reverse': true
					}).
					children().removeClass('fa-sort fa-sort-up').
					addClass('fa-sort-down');
				}
				
			});


		}
	};
}]);

