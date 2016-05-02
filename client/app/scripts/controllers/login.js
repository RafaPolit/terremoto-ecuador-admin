'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller to authenticate users
 */
angular.module('clientApp')
.controller('LoginCtrl', [ '$scope', '$location', 'AuthService', 'rootScopeVariables',
                           function ($scope, $location, AuthService, rootScopeVariables) {
  rootScopeVariables();

  $scope.loginData = {};
  $scope.failed = false;

  $scope.tryLogin = function() {
    AuthService.login($scope.loginData)
    .then(function() {
      $scope.failed = false;
      $location.path('/');
    })
    .catch(function() {
      $scope.failed = true;
    });
  };
}]);
