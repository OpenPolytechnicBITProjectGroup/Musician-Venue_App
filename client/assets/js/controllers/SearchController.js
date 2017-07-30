/*
 * This is the controller for the Search bar
 */

 app.controller('SearchController', ['$rootScope', '$scope', '$http', 'SearchService', 'VenueService', 
                            function ($rootScope, $scope, $http, SearchService, VenueService) {
    
    // Use the getGenres() to get a list to search 
    VenueService.getGenres().then(function (resp) {
        $scope.db_genres = resp.data;
    });

    // takes the selected genre and sends to the api via the service
    $scope.searchVenue = function(search) {
         
        SearchService.searchByGenre(search.genre).then(function (resp) {
                $rootScope.other_venues = resp.data;          
        });
    }

 }]);

