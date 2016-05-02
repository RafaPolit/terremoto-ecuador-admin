'use strict';

describe('Controller: AboutCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var LoginCtrl,
      scope,
      AuthService,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, _AuthService_) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;

    AuthService = _AuthService_;

    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope,
      AuthService: AuthService
    });
  }));

  describe('On instance', function() {
    it('should hold login data on scope', function() {
      expect(scope.loginData).toEqual({});
    });
    it('should hold scope failed to false', function() {
      expect(scope.failed).toBe(false);
    });
  });

  describe('tryLogin()', function() {

    it('should call on AuthService.login', function() {
      spyOn(AuthService, 'login').and.returnValue({ then: function() { return { catch: function() {} }; }});

      scope.loginData.user = 'user';
      scope.loginData.password = 'password';

      scope.tryLogin();

      expect(AuthService.login).toHaveBeenCalledWith(scope.loginData);
    });

    describe('On login success', function() {
      beforeEach(inject(function($q) {
        var deferred = $q.defer();
        deferred.resolve('success message');

        spyOn(AuthService, 'login').and.returnValue(deferred.promise);

        scope.loginData.user = 'user';
        scope.loginData.password = 'password';
      }));

      it('should set failed to false and go to /', inject(function($location) {
        scope.failed = true;
        spyOn($location, 'path');

        scope.tryLogin();
        scope.$digest();

        expect(scope.failed).toBe(false);
        expect($location.path).toHaveBeenCalledWith('/');
      }));
    });

    describe('On login failure', function() {
      beforeEach(inject(function($q) {
        var deferred = $q.defer();
        deferred.reject('error message');

        spyOn(AuthService, 'login').and.returnValue(deferred.promise);

        scope.loginData.user = 'user';
        scope.loginData.password = 'password';
      }));

      it('should set scope.failed to true', inject(function($location) {
        spyOn($location, 'path');

        scope.tryLogin();
        scope.$digest();

        expect(scope.failed).toBe(true);
        expect($location.path).not.toHaveBeenCalled();
      }));
    });

  });

});
