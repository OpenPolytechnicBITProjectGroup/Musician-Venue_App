var app = angular.module('tester', []);

// A test Factory for bands
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

// The Main Controller
app.controller('MainCtrl', function ($scope, Test) {
  $scope.bands = Test.all();
	
});

// A test controller   
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

     // Send request to server on first load of page and return 
       VenueSvc.getVenues().then(function (resp) {
         $scope.other_venues = resp.data;
       });

      // Get the list of genres
      VenueSvc.getGenres().then(function (resp) {
        $scope.db_genres = resp.data;
      });     
}]);

// Service functions for Venue section
app.service('VenueSvc', function ($http) {
 // get_venues function
 this.getVenues = function () {
    return $http.get('/other_venues').then(function (resp){
      return resp;
  });
 }

// get genres function
this.getGenres = function () {
  return $http.get('/genres').then(function(resp){
    return resp;
  });
}

// Sends the Venue data
this.sendVenues = function(venue) {
  return $http.get('/send_venue', {params: venue})
    .then(function(resp){
      return resp;
    });
}
});

// Accepts input from submission form 
function addTestVenues($scope, $http, VenueSvc) {
	 var venues = [];
   //Receives input from form, when submit button is clicked
   // the sendVenue function is activated. 

  // Wait for click then send venue data (submit button)
  $scope.sendVenue = function(venue) {
   
    // params reaches the server as query
    venues.push(new Venue(venue.name, venue.capacity, venue.location, venue.genres));
    
    VenueSvc.sendVenues(venues).then(function(res) {
      
      console.log("response returned:", res); // developer log file
      if (res.data === 'OK'){
        // response is OK so update the venue List
        VenueSvc.getVenues().then(function (resp) {
          console.log('Updating venues with:', resp.data); // another dev log
          $scope.other_venues = resp.data;
        });
      }
    });
    venues = []; // reset the submission form
  }
	return venues;
}