/*
 * This controller is hooked to the entire venue section
 * it controls both venue tables, the top being send data
 * the bottom table is received from database
 */

app.controller('VenueController', ['$rootScope', '$scope', '$http', 'VenueService',
    function ($rootScope, $scope, $http, VenueService) {

        // This acts like a submission form..
        $scope.venues = addTestVenues($rootScope, $scope, $http, VenueService);

        // Send request to server on first load of page and return
        VenueService.getVenues().then(function (resp) {
            $rootScope.response_venues = resp.data;
        });

        // Get the list of genres
        VenueService.getGenres().then(function (resp) {
            $scope.db_genres = resp.data;
        });

    }]);

// Accepts input from submission form
function addTestVenues($rootScope, $scope, $http, VenueService) {
    var venues = [];
    //Receives input from form, when submit button is clicked
    // the sendVenue function is activated.

    // Wait for click then send venue data (submit button)
    $scope.sendVenue = function (venue) {

        // params reaches the server as query
        venues.push(new Venue(venue.name, venue.capacity, venue.location, venue.genres));

        VenueService.sendVenues(venues).then(function (res) {

            console.log("response returned:", res); // developer log file
            if (res.data === 'Created') {
                // response is OK so update the venue List
                VenueService.getVenues().then(function (resp) {
                    console.log('Updating venues with:', resp.data); // another dev log
                    $rootScope.response_venues = resp.data;
                });
            }
        });
        venues = []; // reset the submission form
    };
    return venues;
}