/*
 * This is the controller for the Search bar
 */

 app.controller('SearchController', ['$rootScope', '$scope', 'SearchService', 'GenreService', 
                            function ($rootScope, $scope, SearchService, GenreService) {
    /* Use the getGenres() to get a list to search
    Needed here as the $scope is now just the Search controller
    */
    GenreService.getGenres().then(function (resp) {
        $scope.search_genres = resp.data;
    });
    

    // takes the selected genre and sends to the api via the service
    $scope.searchVenue = function(search) {
         
        SearchService.searchByGenre(search.genre).then(function (resp) {
            // $rootScope is required to update the venue cards    
            $rootScope.response_venues = resp.data;          
        });
    }

 }]);

