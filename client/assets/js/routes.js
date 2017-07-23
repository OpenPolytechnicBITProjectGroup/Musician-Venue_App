app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/venues', {
            templateUrl: '/views/venues.html',
            controller: 'VenueController',
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});