var sportsListControllers = angular.module('sportsListControllers', []);

sportsListControllers.controller('sportsListCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('wires').success(function(data) {
      $scope.wires = data;
  });

  $scope.orderProp = 'votes';
}]);

sportsListControllers.controller('sportsDetailCtrl', ['$scope', '$routeParams', '$http',
   function($scope, $routeParams, $http) {
    $http.get('wires/' + $routeParams.wireId).success(function (data) {
      $scope.wire = data;
    });

    $scope.upvote = function(wire){
      wire.votes += 1;
      $http.get('upvote/' + wire.id).success(function (data) {
        console.log(data);
      });
    }

  }]);