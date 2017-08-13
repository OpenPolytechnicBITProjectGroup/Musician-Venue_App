app.service('GenreService', function($http) {
    // get genres function
    this.getGenres = function () {
        return $http.get('/api/genres').then(function (resp) {
            return resp;
        });
    };
})