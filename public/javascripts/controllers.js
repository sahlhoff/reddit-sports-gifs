var sportsListControllers = angular.module('sportsListControllers', []);

sportsListControllers.controller('sportsListCtrl', function ($scope) {
  $scope.wires = [
    {'name': 'Nexus S',
     'snippet': 'Fast just got faster with Nexus S.',
     'votes': 0},
    {'name': 'Motorola XOOM™ with Wi-Fi',
     'snippet': 'The Next, Next Generation tablet.',
     'votes': 0},
    {'name': 'MOTOROLA XOOM™',
     'snippet': 'The Next, Next Generation tablet.',
     'votes': 0}
  ];
});

sportsListControllers.controller('sportsDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.name = $routeParams.wireName;



  }]);