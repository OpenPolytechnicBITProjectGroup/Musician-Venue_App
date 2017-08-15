

app.controller('ArtistController', ['$rootScope', '$scope', 'ArtistService',
    function ($rootScope, $scope, ArtistService) {

        // Send request to server on first load of page and return
        ArtistService.getArtists().then(function (resp) {
            $rootScope.response_artists = resp.data;
        });
}]);