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
      expect(scope.event.toBeDeleted).toEqual(null);
      $httpBackend.flush();
    });

    it('should set event.allowContentEditing to false', function() {
      expect(scope.event.allowContentEditing).toBe(false);
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
      expect(scope.events[0].status).toBe('1');
      expect(scope.events[1].description).toBe('descrip 2');
      expect(scope.events[1].status).toBe('1');
    });

    it('should assign the subcategories to the scope with their respective fa icons', function() {
      $httpBackend.flush();
      expect(scope.subcategories[0].name).toBe('food');
      expect(scope.subcategories[0].icon).toBe('coffee');
      expect(scope.subcategories[1].name).toBe('water');
      expect(scope.subcategories[1].icon).toBe('tint');
    });
  });

  describe('editEventModal', function() {
    it('should assign the event to the original and a copy to the editing (to prevent double binding)', function() {
      $httpBackend.flush();
      scope.editEventModal(events[1]);
      expect(scope.event.original).toBe(events[1]);
      expect(scope.event.editing).not.toBe(events[1]);
      expect(scope.event.editing).toEqual(events[1]);
    });

    it('should set event.allowContentEditing to false', function() {
      $httpBackend.flush();
      scope.event.allowContentEditing = true;
      scope.editEventModal(events[1]);

      expect(scope.event.allowContentEditing).toBe(false);
    });
  });

  describe('updateEvent', function() {
    it('should call on event update with correct data', function() {
      $httpBackend.flush();
      $httpBackend.expect('PUT', '/event', events[1]).respond({ event: 'event data' });

      scope.event.editing = events[1];
      scope.updateEvent();

      $httpBackend.flush();
    });

    describe ('on PUT succes', function() {

      beforeEach(inject(function(_) {
        $httpBackend.flush();
        $httpBackend.expect('PUT', '/event', scope.events[1]).respond({ event: { description: 'returned data' } });
        scope.event.editing = _(scope.events[1]).clone();
        scope.event.original = scope.events[1];
        scope.updateEvent();
        $httpBackend.flush();
      }));

      it('should update the data with response data (to ensure changes are correct)', function() {
        expect(scope.events[1].description).toBe('returned data');
      });
    });
  });

  describe('deleteEvent', function() {

    it('should call on event del with correct data', function() {
      $httpBackend.flush();
      $httpBackend.expect('DELETE', '/event?id=77')
      .respond({ event_deleted: scope.event.toBeDeleted });

      scope.event.toBeDeleted = 77;
      scope.deleteEvent();

      $httpBackend.flush();
    });

    describe ('on DELETE succes', function() {

      beforeEach(function() {
        $httpBackend.flush();

        scope.events[0].id = 77;
        scope.event.toBeDeleted = 77;

        $httpBackend.expect('DELETE', '/event?id=77').respond({ event_deleted: scope.event.toBeDeleted });

        scope.deleteEvent();

        $httpBackend.flush();
      });

      it('should remove the event from the events)', function() {
        expect(scope.events.length).toBe(1);
        expect(scope.events[0].description).toBe('descrip 2');
      });
    });
  });
});
