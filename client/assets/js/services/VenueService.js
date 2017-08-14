// Service functions for Venue section
app.service('VenueService', function ($http) {
    // get_venues function
    this.getVenues = function () {
        return $http.get('/api/venues').then(function (resp) {
            return resp;
        });
    };

// Sends the Venue data
    this.sendVenues = function (venue) {
        return $http.post('/api/venues', venue)
            .then(function (resp) {
                return resp;
            });
    }
});