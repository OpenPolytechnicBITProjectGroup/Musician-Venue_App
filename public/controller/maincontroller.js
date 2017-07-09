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

// Returns some test Venue objects. 
function addTestVenues() {
	var venues = [];
  
	venues.push(new Venue("Crown Hotel", 500, "Auckland", ["Rock", "Blues", "Country"]));
	venues.push(new Venue("Bar Sinister", 300, "Christchurch", ["Metal", "Rock"]));

	return venues;
}

app.controller('MainCtrl', function ($scope, Test) {
  $scope.bands = Test.all();
	$scope.venues = addTestVenues();
});
   
app.controller('WorkingCtrl', function ($scope, Test) {
  $scope.working = Test.working();
});        
	
