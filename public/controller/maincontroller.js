var app = angular.module('tester', []);

app.factory("Test", function() {
  var bands = ["Six60", "Shihad", "Exponents"];
  var working = "A description of the band";

    return {
      all: function () {
        return bands;
      },
      working: function () {
        return working;
      }
    }
})
      
app.controller('MainCtrl', function ($scope, Test) {
  $scope.bands = Test.all();
});
   
app.controller('WorkingCtrl', function ($scope, Test) {
  $scope.working = Test.working();
});        

        