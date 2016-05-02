'use strict';

angular.module('clientApp')
.service('rootScopeVariables', function($rootScope, $location, AuthService) {
  return function() {
    $rootScope.locationPath = $location.path();
    $rootScope.$on('$locationChangeSuccess', function() {
      $rootScope.locationPath = $location.path();
    });

    $rootScope.isAuthenticated = AuthService.isAuthenticated;

    $rootScope.logout = AuthService.logout;
  };
});