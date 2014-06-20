var sportsListControllers = angular.module('sportsListControllers', []);

sportsListControllers.controller('sportsListCtrl', ['$scope', '$http', 'ipCookie', '$location',
  function ($scope, $http, ipCookie, $location) {
    $http.get('wires').success(function(data) {
      $scope.wires = data;
  });

  $scope.orderProp = 'votes';

  $scope.upvote = function(wire){
    if(!ipCookie(wire.id.toString())){
      wire.votes += 1;
      $http.get('upvote/' + wire.id).success(function (data){
        ipCookie(wire.id, true);
      });
    } else {
      console.log('boo!');
    }
  }

  $scope.subscribe = function(){
    if($scope.email){
      $http.post('subscribe/'+$scope.email, {}).success(function (data){
        $scope.email = '';
      });
    }
  }

}]);

sportsListControllers.controller('sportsDetailCtrl', ['$scope', '$routeParams', '$http',
   function($scope, $routeParams, $http) {
    $http.get('wires/' + $routeParams.wireId).success(function (data) {
      $scope.wire = data;
    });

    $scope.upvote = function(wire){
      if(!ipCookie(wire.id.toString())){
        wire.votes += 1;
        $http.get('upvote/' + wire.id).success(function (data) {
          ipCookie(wire.id, true);
        });
      } else {
        console.log('boo');
      }
      
    }

  }]);