/*
 * This controller is hooked to the entire venue section
 * it controls both venue tables, the top being send data
 * the bottom table is received from database
 */

app.controller('VenueController', ['$rootScope', '$scope', 'VenueService',
    function ($rootScope, $scope, VenueService) {

        // Send request to server on first load of page and return
        VenueService.getVenues().then(function (resp) {
            $rootScope.response_venues = resp.data;
        });
}]);