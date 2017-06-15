angular.module('starter.controllers')

.controller('ProductDetailCtrl', function($scope,$rootScope, $ionicModal, $timeout,$ionicPopover,$ionicSlideBoxDelegate,$stateParams,$location,$state,productsService,eCart,alertmsgService,dataManager,$cordovaToast)
	{
	$scope.sizes=['S','M','L','XL'];
	$scope.productParticular = $stateParams.prId;
	$rootScope.cat_id	= $stateParams.catid;
	$rootScope.cat_Name	= $stateParams.catName;
	$scope.products= [];
	// console.log($scope.productParticular);
	// console.log($rootScope.cat_id);

	productsService.getProducts($rootScope.cat_id,$rootScope.cat_Name,$scope.product_page)
	.then(function(response) {
	if(response.data.success){
		$scope.products	= $scope.products.concat(response.data.data);
		$scope.specificProducts = $scope.products[$scope.products.getIndexBy("id", $scope.productParticular)]
		
    console.log($scope.specificProducts);
		$scope.specificProducts.cartQnt= eCart.getProductQty($scope.specificProducts);
		$scope.class = ($scope.specificProducts.cartQnt<=0)?"beforeFlip":"afterFlip";
	} // On lasy loading.
		//$scope.$broadcast('scroll.infiniteScrollComplete');
	});


	if(!$stateParams.prId){
		$state.go('app.dashboard');
	}

	$ionicPopover.fromTemplateUrl('popover.html', {
	scope: $scope
	}).then(function(popover) {	$scope.popover = popover;	});

   $scope.openPopover = function($event) {  $scope.popover.show($event);  };

   $scope.closePopover = function() {  $scope.popover.hide();  };

  //delivery option modal
	$ionicModal.fromTemplateUrl('delivery-option-modal.html', {
	  id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: true,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal1 = modal;
   });
//modal or the image slide box section
   $ionicModal.fromTemplateUrl('image-slider-option-modal.html', {
	  id: '2', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: true,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal2 = modal;
   });
   $scope.openModal = function(index) {
	if(index == 1){
	$scope.oModal1.show();
	}
	else if(index == 2){
	$scope.oModal2.show();
	}

	};
    $scope.closeModal = function(index) {
	  if(index == 1){
	   $scope.oModal1.hide();
	  }
	  else if(index == 2){
	   $scope.oModal2.hide();
	  }

	};

	$scope.nextSlide = function() { $ionicSlideBoxDelegate.next();  }
  $scope.previousSlide = function() {  $ionicSlideBoxDelegate.previous();  }

  // productsService.getProductDetail($stateParams.proid)
	// 	.then(function(response) {
	// 		$scope.productDetail = response.data;
	// 		console.log($scope.productDetail)	;
	//
	// 	}, function(error) {
	// 		alert("Error proudcts : "+error);
	// 	});

		//-------------------------------
		//----------Cart Process--------------------
	//  $scope.selectId='';
	//  $scope.AddToCart = function(prodObj){
	// 	 //console.log(prodObj);
	// 	 // console.log('from add to cart process');
	// 	 // console.log(prodObj);
	// 	 $scope.selectId=prodObj.id;
	// 	 // console.log($scope.selectId);
	// 	 $scope.check=prodObj.product_name;
	// 	 // console.log($scope.check);
	// 	 $timeout(function(){$scope.selectId='';}, 700);
	// 	 eCart.addToCart(prodObj);
	// 	 // console.log('Cart value is ');
	// 	 // console.log($rootScope.cartItems);
	// 	 $rootScope.cartItems = eCart.cartProducts.length;
	// 	 $scope.specificProducts.cartQnt= eCart.getProductQty(prodObj);


 // 		 $scope.class = ($scope.specificProducts.cartQnt<=0)?"beforeFlip":"afterFlip";
	// 	 if(!eCart.isAvailable){
	// 		 alertmsgService.showMessage("The product become out of the stock, you can not buy more quantity of this product.");
	// 	 }
	// 	 //console.log($scope.specificProducts);
	// 	 // console.log('Cart value is ');
	// 	 // console.log($rootScope.cartItems);
	// }
 //--------------------------------------------
 //------------flib button change class-----
 //--------counter events-------
	// $scope.decrement = function(prodObj) {
	// 	eCart.removeOneProduct(prodObj);
	// 	$rootScope.cartItems = eCart.cartProducts.length;
	// 	$scope.specificProducts.cartQnt= eCart.getProductQty(prodObj);
	// 	$scope.class = ($scope.specificProducts.cartQnt<=0)?"beforeFlip":"afterFlip";
	// 	console.log(prodObj);
	// }

	 $scope.visitedUser = function(proId){
	 	var userid = localStorage.getItem("User_Id"); 
	 	$scope.visiteduserdata = { user_id :  userid, furniture_id : proId};
	    dataManager.post(addvisitedUser, $scope.visiteduserdata).then( function (response){
	    	 if(response.status == "true"){
	    	 	console.log(response.message);
	     	}else{
	     		console.log(response.message);
	     	}
	    }, function (error){
	        console.log(error);
	    });
	  }


	  $scope.getProductDetail = function(proId){
	    $scope.productdetail = [];
	    dataManager.get(productdetail+'/'+proId ).then( function (response){
	    	 if(response.status == "true"){
	    	   $scope.visitedUser(proId);
	      	   $scope.productdetail['detail'] = response.data['0'];
	       	   $scope.productdetail['images'] = response.data['fotos'];
	     	}else{
	     		cordovaToast.showLongBottom(response.message);
	     		console.log(response.message);
	     	}
	    }, function (error){
	        console.log(error);
	    });
	  }

    $scope.getProductDetail($scope.productParticular);


     $scope.friends = [
	    {name:'John', age:25, gender:'boy'},
	    {name:'Jessie', age:30, gender:'girl'},
	    {name:'Johanna', age:28, gender:'girl'},
	    {name:'Joy', age:15, gender:'girl'},
	    {name:'Mary', age:28, gender:'girl'},
	    {name:'Peter', age:95, gender:'boy'},
	    {name:'Sebastian', age:50, gender:'boy'},
	    {name:'Erika', age:27, gender:'girl'},
	    {name:'Patrick', age:40, gender:'boy'},
	    {name:'Samantha', age:60, gender:'girl'}
	  ];




	 $scope.showProductDetail = function(catid){
     //console.log(category_id);
    // console.log(" again from product banner controller");
    //$location.path('#/app/productslistdetail/11/1/ACCENT');
    console.log(catid);
     //$location.url('/product_detail.html');
     //$location.path('app/products/'+catid+'/'+'ACCENT');
     var category_name="ACCENT";
     // $location.path('app/products/'+11+'/'+1+'/'+category_name);
  };

	//ionicMaterialInk.displayEffect();

})
