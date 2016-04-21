'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var MainCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  describe('On instance', function() {
    it('should have the associated sub categories icons', inject(function (_) {
      expect(_(scope.subCategories).isObject()).toBe(true);
      expect(scope.subCategories[1].icon).toBeDefined();
      expect(scope.subCategories[1].color).toBeDefined();
    }));
  });
});
