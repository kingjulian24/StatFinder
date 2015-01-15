
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