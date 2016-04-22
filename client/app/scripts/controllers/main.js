'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('MainCtrl', [ '$rootScope', '$scope', '$http', '$location', '_',
                          function ($rootScope, $scope, $http, $location, _) {

  $rootScope.locationPath = $location.path();
  $rootScope.$on('$locationChangeSuccess', function() {
    $rootScope.locationPath = $location.path();
  });

  $scope.event = {
    original: {},
    editing: {},
    toBeDeleted: null,
    allowContentEditing: false
  };

  $scope.progressStatuses = {
    1: { status: 'unattended', class: 'danger' },
    2: { status: 'in-progress', class: 'warning' },
    3: { status: 'resolved', class: 'success' }
  };

  $http.get('/events_list', {})
  .then(
  function successCallback(response) {
    $scope.events = _(response.data.events).map(function(event) {
      return _(event).extend({ progress: String(event.progress) });
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
      $scope.events = _($scope.events).reject(function(event) { return event.id === response.data.eventDeleted; });
    });
  };

  // ---

  var iconKeys = {
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
      subcategory.icon = iconKeys[subcategory.name];
    });
  }

}]);
