angular
      .module('tester', [])
      .controller('MainCtrl', function ($scope, $http) {
        $scope.nodes = [];
        $scope.working = "";

        $scope.show = function () {
          $http.get('/bands').then(function (resp) {
            $scope.nodes = resp.data;
          });
        };

        $scope.working = function () {
            $http.get('/working').then(function (resp) {
                $scope.working = resp.data;
            })
        };

        $scope.submit = function() {
          console.log("entering search...");
          return $http.get('/search').then(function (resp) {
            $scope.show();
            return resp;
          })
        }

        $scope.show();
      });