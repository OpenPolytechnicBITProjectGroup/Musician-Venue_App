var app = angular.module('tester', []);

app.factory("Test", [ function() {
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

// Returns some test Venue objects. 
function addTestVenues($scope, $http, VenueSvc) {
	 var venues = [];
  // Input new data here (i.e the submission form)
	//venues.push(new Venue("The Velvet", 50, "Auckland", ["Rock", "Blues", "Country"]));
	
  // Wait for click then send venue data (submit button)
  $scope.sendVenue = function(venue) {
   
    // params reaches the server as query
    venues.push(new Venue(venue.name, venue.capacity, venue.location, venue.genres));
    $http.get('/send_venue', {params: venues}).then(function(res) {

      console.log("response returned:", res);
      if (res.data === 'OK'){
        // response is OK so update the venue List
        VenueSvc.getVenues().then(function (resp) {
          console.log('Updating venues with:', resp.data);
          $scope.other_venues = resp.data;
        });
      }
    });
    venues = [];
  }

	return venues;
}

app.controller('MainCtrl', function ($scope, Test) {
  $scope.bands = Test.all();
	
});
   
app.controller('WorkingCtrl', function ($scope, Test) {
  $scope.working = Test.working();
});        

/* this controller is hooked to the entire venue section
  * it controls both venue tables, the top being send data
  * the bottom table is recieved from database
  */
app.controller('VenueCtrl', ['$scope', '$http', 'VenueSvc', function ($scope, $http, VenueSvc) {

      // This acts like a submission form..
      $scope.venues = addTestVenues($scope, $http, VenueSvc);

     /* Send request to server on first load of page and return
        console.log("sending request to server");
        $http.get('/other_venues')
          .then(function (resp) {
            // sends the returned data to the $scope item
            $scope.other_venues = resp.data;
            console.log("request back:", resp.data);         
          });
      */
       VenueSvc.getVenues().then(function (resp) {
         $scope.other_venues = resp.data;
       });

      // Get the list of genres
      $http.get('/genres').then(function (resp) {
        $scope.db_genres = resp.data;
      });     
}]);

app.service('VenueSvc', function ($http) {
 this.getVenues = function () {
    return $http.get('/other_venues').then(function (resp){
      return resp;
  });
 } 
});