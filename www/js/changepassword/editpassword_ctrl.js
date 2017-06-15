angular.module('starter.controllers')
.controller('EditpasswordCtrl', function($scope,$rootScope,$ionicModal,$timeout,$cordovaToast,$window,dataManager) {
	'use strict';
	   $scope.iniLogin = {};
	   var User_Id = localStorage.getItem("User_Id");
	   $scope.userLoginPassword = function(form) {
                if(form.$valid) {
                    $scope.iniLogin = {userId:User_Id, oldpassword : $scope.iniLogin.oldpassword, password : $scope.iniLogin.password, confirmPass : $scope.iniLogin.confirm};
                    console.log($scope.iniLogin);
                    dataManager.post(userChangePassword, $scope.iniLogin).then( function(response){
                    	console.log(response.message);
                        if(response.status == "true"){
                             $cordovaToast.showLongBottom(response.message);
                             $window.location.href = '#/app/dashboardlist';
                        } else {
                            $cordovaToast.showLongBottom(response.message);
                            console.log(response.message);
                        }
                    }, function (error){
                        console.log(error);
                    });
                }
            }

});
