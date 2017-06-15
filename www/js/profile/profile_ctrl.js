angular.module('starter.controllers')
.controller('ProfileCtrl', function($scope,$rootScope,$ionicModal,$timeout,dataManager, $cordovaToast, $window, $cordovaOauth, $localStorage, $ionicPopup, $http) {
	'use strict';
	$scope.isProfileImg = true;
	 //action sheet for upload photo button
	$scope.showActionsheetphoto = function() {
	
		$ionicActionSheet.show({
			buttons: [  { text: 'TAKE PHOTO' }, { text: 'PHOTO FROM LIBRARY' } ],
	
			cancelText: 'Cancel',
			cancel: function() {  $scope.isProfileImg = true;   },
			buttonClicked: function(index) {
				$scope.isProfileImg = false;
				$scope.selectImage(index);
				return true;
			}
		});
	}

	dataManager.get(storeList).then(function (response) {
                console.log(JSON.stringify(response.data));
                if (response.status == 'true') {
                    $scope.stores = response.data;
                } else {
                    console.log(response.message);
                }
            }, function (error) {
                console.log(error);
            });


	$scope.profile = {};
	$scope.branches = {};
	var userid = localStorage.getItem("User_Id"); 
	$scope.userData = function(){
		dataManager.get(getUserDetail+'/'+userid).then( function(response) {
			if(response.status == "true"){
				console.log(response.data);
				$scope.profile = response.data;
				$scope.branches = response.branch;
			}else{
				console.log(response.message);
			}
		}, function(error){

		});
	}
	$scope.userData();


	/*Get Branches*/
    $scope.getBranch = function (store, city) {
        if (store != '' && city != '') {
            dataManager.get(branchList + store+'/'+ city).then(function (response) {
                console.log(JSON.stringify(response.data));
                if (response.status == 'true') {
                    $scope.branches = response.data;
                } else {
                    console.log(response.message);
                }
            }, function (error) {
                console.log(error);
            });
        } else {
            alert("fa");
        }
    }
      $scope.profile = {};
      $scope.userUpdate = function(form) {
              if(form.$valid) {
                    $scope.profile = {email:$scope.profile.useremail,first_name:$scope.profile.fullname, userid : userid};
                    dataManager.post(userUpdateState, $scope.profile).then( function(response){
                        console.log(JSON.stringify(response.data));
                        if(response.status == "true"){
                        	 $scope.profile = response.data;
                        	 $cordovaToast.showLongBottom('Profile update successfully!');
                        } else {
                            $cordovaToast.showLongBottom(response.message);
                            console.log(response.message);
                        }
                    }, function (error){
                        console.log(error);
                    });
                }
            }

	
	$rootScope.imgv = 1;
	$scope.selectImage = function(index){
		ImageService.handleProfileImage(index,$scope.device_uuid)
		.then(function(result){
			 if(result.status){
				 $rootScope.imgv++;
				 $scope.usermaster.profile_img	= result.data+"?v="+$rootScope.imgv;
			 }else{
				 alertmsgService.tostMessage('Failed to update image.Please try again.');
			 }
			 $scope.isProfileImg = true;
		}, function(error) {
			alertmsgService.tostMessage('Failed to update image.Please try again.');
						scope.isProfileImg = true;
		 });
	}
	
		$scope.pwdData = {oldpassword:'',newpassword:'',access_token:'',access_token:''}
	$scope.updatePassword = function(){
		$scope.pwdData .access_token = $scope.usermaster.access_token;
	
		usersService.userChangePassword($scope.pwdData)
		.then(function(response){
			if(response.status){
				$scope.pwdData = {oldpassword:'',newpassword:'',access_token:'',access_token:''}
			}else{
				$scope.pwdData.access_token = '';
			}
			alertmsgService.tostMessage(response.msg);
		}, function(error) {
			alertmsgService.tostMessage('Request Failed. Please try again.');
		 });
	}
});
