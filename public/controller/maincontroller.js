var app = angular.module('tester', []);

app.factory("Test", [('$scope', '$http'), function() {
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
}]);

function postVenues($scope, venues) {
  console.log("postingVenues:", venues);
  $scope.other_venues = venues;
}

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

// this controller is hooked to second table $scope.other_venues	
app.controller('VenueCtrl', function ($scope, $http) {
  
     // Send request to server
        console.log("sending request to server");
        $http.get('/other_venues')
          .then(function (resp) {
            // sends the returned data to the $scope item
            $scope.other_venues = resp.data;
            console.log("request back:", resp.data);         
          });      
});

