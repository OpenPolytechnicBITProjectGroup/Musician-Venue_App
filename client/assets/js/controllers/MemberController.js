app.controller('MemberController', [
    '$rootScope', '$scope', 'GenreService', 'VenueService',
    function($rootScope, $scope, GenreService, VenueService) {
        // get the genres for the form
        GenreService.getGenres().then(function(resp){
            $scope.db_genres = resp.data;
        });

        //Submit the form
        $scope.venues = addVenue($rootScope, $scope, VenueService);
    }
])

function addVenue($rootScope, $scope, VenueService) {
    var venues = [];
    //Receives input from form, when submit button is clicked
    // the sendVenue function is activated.

    // Wait for click then send venue data (submit button)
    $scope.sendVenue = function (venue) {

        // params reaches the server as query
        venues.push(new Venue(venue.name, venue.capacity, venue.location, venue.genres));

        VenueService.sendVenues(venues).then(function (res) {

            console.log("response returned:", res); // developer log file
            
            
        });
        venues = []; // reset the submission form
    };
    return venues;
}