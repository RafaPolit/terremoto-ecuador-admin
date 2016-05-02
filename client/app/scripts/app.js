'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
.module('clientApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'smart-table',
  'underscore'
])
.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl',
      controllerAs: 'about'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'login'
    })
    .otherwise({
      redirectTo: '/login'
    });
})
.run(function ($rootScope, $location, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next) {
    if (!AuthService.isAuthenticated()) {
      if (next.$$route.originalPath !== '/login' && next.$$route.originalPath !== '/about') {
        event.preventDefault();
        $location.path('/login');
      }
    }
  });
})
;
