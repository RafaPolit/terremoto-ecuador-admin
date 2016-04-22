'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('MainCtrl', [ '$scope', '$http', '_', function ($scope, $http, _) {

  $scope.event = {
    original: {},
    editing: {},
    toBeDeleted: null,
    allowContentEditing: false
  };

  $scope.statuses = {
    1: { status: 'unattended', class: 'danger' },
    2: { status: 'in-progress', class: 'warning' },
    3: { status: 'resolved', class: 'success' }
  };

  $http.get('/events_list', {})
  .then(
  function successCallback(response) {
    $scope.events = _(response.data.events).map(function(event) {
      // Assign temporary status
      return _(event).extend({ status: '1' });
    });

    $scope.subcategories = response.data.subcategories;
    assignFaIcons($scope.subcategories);
  },
  function errorCallback(response) {
    console.log(response);
  });

  $scope.editEventModal = function(event) {
    $scope.event.allowContentEditing = false;
    $scope.event.original = event;
    $scope.event.editing = _(event).clone();
  };

  $scope.updateEvent = function() {
    $http.put('/event', $scope.event.editing)
    .then(function(response) {
      _($scope.event.original).extend(response.data.event);
    });
  };

  $scope.confirmDeleteEvent = function(event) {
    $scope.event.toBeDeleted = event.id;
  };

  $scope.deleteEvent = function() {
    $http({ method: 'DELETE', url: '/event', params: { id: $scope.event.toBeDeleted } })
    .then(function(response) {
      $scope.events = _($scope.events).reject(function(event) { return event.id === response.data.event_deleted; });
    });
  };

  // ---

  var icon_keys = {
    food: 'coffee',
    water: 'tint',
    clothing: 'female',
    drugs: 'medkit',
    rescue: 'ambulance',
    transport: 'bus',
    hostel: 'bed'
  };

  function assignFaIcons(subcategories) {
    _(subcategories).each(function(subcategory) {
      subcategory.icon = icon_keys[subcategory.name];
    });
  }

}]);
