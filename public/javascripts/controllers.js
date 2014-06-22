var sportsListControllers = angular.module('sportsListControllers', []);

sportsListControllers.controller('sportsListCtrl', ['$scope', '$http', 'ipCookie', '$location',
  function ($scope, $http, ipCookie, $location) {
    $http.get('wires').success(function(data) {
      $scope.wires = data;
      $scope.currentPage = 0;
      $scope.pageSize = 5;
  });

  $scope.orderProp = 'votes';

  $scope.upvote = function(wire){
    if(!ipCookie(wire._id.toString())){
      wire.votes += 1;
      $http.get('upvote/' + wire._id).success(function (data){
        ipCookie(wire._id, true);
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

sportsListControllers.controller('sportsDetailCtrl', ['$scope', '$routeParams', '$http', 'ipCookie',
   function($scope, $routeParams, $http, ipCookie) {
    $http.get('wires/' + $routeParams.wireId).success(function (data) {
      $scope.wire = data;
    });

    $scope.upvote = function(wire){
      if(!ipCookie(wire._id.toString())){
        wire.votes += 1;
        $http.get('upvote/' + wire._id).success(function (data) {
          ipCookie(wire._id, true);
        });
      } else {
        console.log('boo');
      }
      
    }

  }]);