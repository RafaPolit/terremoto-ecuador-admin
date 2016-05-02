/* global moment */
'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('MainCtrl', [ '$rootScope', '$scope', '$http', '$location', 'rootScopeVariables', '_',
                          function ($rootScope, $scope, $http, $location, rootScopeVariables, _) {

  rootScopeVariables();

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

  $scope.event = {
    original: {},
    editing: {},
    toBeDeleted: null,
    allowContentEditing: false
  };

  $scope.statusReports = {
    reported: { status: 'Reportado', class: 'danger' },
    in_progress: { status: 'En progreso', class: 'warning' }, 
    attended: { status: 'Atendido', class: 'info' },
    closed: { status: 'Cerrado', class: 'success' }
  };

  $http.get('/events_list', {})
  .then(function(response) {
    $scope.events = _(response.data.events).map(function(event) {
      return _(event).extend({ status_report: event.status_report || 'reported' });
    });

    $scope.subcategories = response.data.subcategories;
    assignFaIcons($scope.subcategories);
  })
  .catch(function(response) {
    console.log(response);
  });

  $scope.editEventModal = function(event) {
    $scope.event.allowContentEditing = false;
    $scope.event.original = event;
    $scope.event.editing = _(event).clone();
    // TEST!
    $scope.event.loading = true;
    $scope.event.comments = [];
    $http({ url: '/comments', method: 'GET', params: { crime: $scope.event.editing.id } })
    .then(function(response) {
      $scope.event.comments = response.data.comments;
      $scope.event.loading = false;
    });
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

  $scope.formatDate = function(date, full) {
    return (full) ? moment(date).format('MMMM D YYYY, h:mm:ss a') : moment(date).calendar();
  }; 

}]);
