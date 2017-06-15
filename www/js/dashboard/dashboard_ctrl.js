angular.module('starter.controllers')
.controller('DashboardCtrl', function($scope,$location,$rootScope,$state,categoryService,dashboardService,dataManager) {
	'use strict';
	
	//--------Slider Top Banners------------------------
	dashboardService.getBanners()
	.then(function(response) {
		$scope.bannerData=response.data.appbanners.slider;
	}, function(error) {
		$rootScope.tostMsg(error);
	});
	//--------Main banners------------------------
	dashboardService.getMainBanners()
	.then(function(response) {
		$scope.bannerMainData=response.data.appbanners.slider;
	}, function(error) {
		$rootScope.tostMsg(error);
	});
	//--------category slider banners------------------------
	dashboardService.getAdsSlider()
	.then(function(response) {
		$scope.bannerAdsData=response.data.appbanners.slider;
	}, function(error) {
		$rootScope.tostMsg(error);
	});



	$scope.showProductSpecific = function(category_id,category_name){
            console.log(category_id);
            console.log(category_name);
    // console.log(" again from product banner controller");
    $location.path('app/products/'+category_id+'/'+category_name.replace("&amp;","and"));
   
  }

  $scope.getProductList = function(){
    $rootScope.productlist = {}
    var store_id = localStorage.getItem("store_id"); 
    dataManager.get(productlist+'/'+store_id+'/2' ).then( function (response){
        console.log(response.data);
        $rootScope.productlist = response.data;
        $rootScope.productlistMain = response.data;
    }, function (error){
        console.log(error);
    });
  }

  $scope.getProductList();

   $scope.data = {
    grid: false
  };
  
  $scope.edit = function(item) {
    alert('Edit Item: ' + item.id);
  };

  $scope.include = function include(arr, obj) {
    for(var i=0; i<arr.length; i++) {
      if (arr[i] == obj) return true;
    }
  }

  
  // $scope.test = function(menuname, id){
   
  //   var dst = [];
  //   var temp = {};

  //   if( menuname == 'tapiz_id' && id != ''){
  //      temp = { 'tapiz_id' : id };
  //   }else if(menuname == 'mecanismo_id' && id != ''){
  //      temp = { 'mecanismo_id' : id };
  //    }else if(menuname == 'color_id' && id != ''){
  //      temp = { 'color_id' : id };
  //    }

  //   // var newArray = angular.merge(dst, ArraysTapiz, ArraysMe, ArraysCo);

  //   console.log(JSON.stringify(dst.push(temp)));
  
  // }


  $scope.test = function(menuname, id){
  	console.log(JSON.stringify($rootScope.productlist));
    var filtered = [];
    var items = $rootScope.productlistMain;
    console.log('menuname : '+ menuname);
    console.log('id : '+ id);
    var letterMatch = new RegExp(id, 'i');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var match = '';
      if(menuname == 'tapiz_id'){
      	 match = item.tapiz_id;
      }else if(menuname == 'mecanismo_id'){
      	 match = item.mecanismo_id;
      }else{
      	 match = item.color_id;
      }

      if (letterMatch.test(match)) {
        filtered.push(item);
      }
    }
     $rootScope.productlist = filtered;

  }

  // $scope.clearall = function(){
  //     var items = $rootScope.productlistMain;
  //     $rootScope.productlist = items;
  // }

})

.filter('filter', function() {

 return function (items, letter) {
 	console.log(letter);
    var filtered = [];
    var letterMatch = new RegExp(letter, 'i');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (letterMatch.test(item.nombre) || letterMatch.test(item.id_producto)) {
        filtered.push(item);
      }
    }
    return filtered;
  };

});
