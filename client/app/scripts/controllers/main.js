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

  $scope.event = { original: {}, editing: {} };
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
    assign_fa_icons($scope.subcategories);
  },
  function errorCallback(response) {
    console.log(response);
  });

  $scope.edit_event_modal = function(event) {
    $scope.event.original = event;
    $scope.event.editing = _(event).clone();
  };

  // TEST! - Mocked update - No DB interaction
  $scope.edit_event = function() {
    _($scope.event.original).extend($scope.event.editing);
    console.log($scope.event);
  };
  // -----

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

  function assign_fa_icons(subcategories) {
    _(subcategories).each(function(subcategory) {
      subcategory.icon = icon_keys[subcategory.name];
    });
  }

}]);
