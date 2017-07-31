app.service('SearchService', function($http) {
    
    // sends "genre search value" to the api
    this.searchByGenre = function(genre) {
        return $http.get('/api/search', {params: {type: 'venue', genre: genre}})
        .then(function (resp){
            return resp;
        })
    }
});