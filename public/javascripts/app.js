var sportsList = angular.module('sportsList', [
  'ngRoute',
  'sportsListControllers'
]);

sportsList.config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
      when('/wires', {
        templateUrl: 'partials/wire-list.html',
        controller: 'sportsListCtrl'
      }).
      when('/wires/:wireId', {
        templateUrl: 'partials/wire-detail.html',
        controller: 'sportsDetailCtrl'
      }).
      otherwise({
        redirectTo: '/wires'
      });
  }])