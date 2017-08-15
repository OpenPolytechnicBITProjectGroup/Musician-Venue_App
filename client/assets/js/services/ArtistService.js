// Service functions for Artist section
app.service('ArtistService', function ($http) {
    // get_artists function
    this.getArtists = function () {
        return $http.get('/api/artists').then(function (resp) {
            return resp;
        });
    };
});