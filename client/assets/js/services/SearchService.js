app.service('SearchService', function($http) {
    
    // sends "genre search value" to the api
    this.searchByGenre = function(search) {
        return $http.get('/api/searchByGenres', {params: search})
        .then(function (resp){
            return resp;
        })
    }
});