'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('MainCtrl', [ '$scope', '$http', function ($scope, $http) {

  $scope.subCategories = {
    1: { icon: 'coffee', color: 'orange'},
    2: { icon: 'tint', color: 'orange'},
    3: { icon: 'female', color: 'yellow'},
    4: { icon: 'medkit', color: 'red'},
    5: { icon: 'ambulance', color: 'red'},
    6: { icon: 'bus', color: 'orange'},
    7: { icon: 'bed', color: 'yellow' }
  };

  // TEST!
  $http.get('/events_list', {})
  .then(
  function successCallback(response) {
    console.log(response.data.msg);
  },
  function errorCallback(response) {
    console.log(response.data.msg);
  });
  // ------

  $scope.rowCollection = [
    { subcategory_id: 4, description: 'favor mandar lo que sea', address: 'Troncal Amazónica', latitude: '-1.9400893594', longitud: '-77.7282714844', created_at: '2016-04-19 02:08:19'},
    { subcategory_id: 2, description: 'favor mandar lo que sea', address: 'Troncal Amazónica', latitude: '0.6045801500', longitud: '-80.0185775757', created_at: '2016-04-19 02:08:19'},
    { subcategory_id: 1, description: 'favor mandar lo que sea', address: 'Troncal Amazónica', latitude: '-1.9400893594', longitud: '-77.7282714844', created_at: '2016-04-19 02:08:19'},
    { subcategory_id: 3, description: 'favor mandar lo que sea', address: 'Troncal Amazónica', latitude: '-1.9400893594', longitud: '-77.7282714844', created_at: '2016-04-19 02:08:19'},
    { subcategory_id: 5, description: 'favor mandar lo que sea', address: 'Troncal Amazónica', latitude: '-1.9400893594', longitud: '-77.7282714844', created_at: '2016-04-19 02:08:19'},
    { subcategory_id: 6, description: 'favor mandar lo que sea', address: 'Troncal Amazónica', latitude: '-1.9400893594', longitud: '-77.7282714844', created_at: '2016-04-19 02:08:19'},
    { subcategory_id: 7, description: 'favor mandar lo que sea', address: 'Troncal Amazónica', latitude: '-1.9400893594', longitud: '-77.7282714844', created_at: '2016-04-19 02:08:19'},
  ];

}]);
