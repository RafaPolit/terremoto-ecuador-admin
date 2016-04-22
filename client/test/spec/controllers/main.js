'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var MainCtrl,
      scope,
      $httpBackend,
      events,
      subcategories;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    scope = $rootScope.$new();

    events = [
      { description: 'descrip 1' },
      { description: 'descrip 2' }
    ];

    subcategories = [
      { id: 1, name: 'food' },
      { id: 2, name: 'water' },
      { id: 3, name: 'rescue' }
    ];

    $httpBackend = _$httpBackend_;
    $httpBackend.expect('GET', '/events_list').respond({ events: events, subcategories: subcategories });

    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  afterEach(inject(function($httpBackend) {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   }));

  describe('On instance', function() {
    it('should hold event in scope with original values and editing values', function() {
      expect(scope.event.original).toEqual({});
      expect(scope.event.editing).toEqual({});
      $httpBackend.flush();
    });

    it('should hold statuses in scope', function() {
      expect(scope.statuses[1]).toBeDefined();
      expect(scope.statuses[2]).toBeDefined();
      $httpBackend.flush();
    });
    
    it('should ask for the events list and assign them to scope, with status added', function() {
      $httpBackend.flush();
      expect(scope.events[0].description).toBe('descrip 1');
      expect(scope.events[0].status).toBe(1);
      expect(scope.events[1].description).toBe('descrip 2');
      expect(scope.events[1].status).toBe(1);
    });

    it('should assign the subcategories to the scope with their respective fa icons', function() {
      $httpBackend.flush();
      expect(scope.subcategories[0].name).toBe('food');
      expect(scope.subcategories[0].icon).toBe('coffee');
      expect(scope.subcategories[1].name).toBe('water');
      expect(scope.subcategories[1].icon).toBe('tint');
    });
  });

  describe('edit_event_modal', function() {
    it('should assign the event to the original and a copy to the editing (to prevent double binding)', function() {
      $httpBackend.flush();
      scope.edit_event_modal(events[1]);
      expect(scope.event.original).toBe(events[1]);
      expect(scope.event.editing).not.toBe(events[1]);
      expect(scope.event.editing).toEqual(events[1]);
    });
  });
});
