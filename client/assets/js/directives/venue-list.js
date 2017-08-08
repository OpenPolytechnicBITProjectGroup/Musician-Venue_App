app.directive('venueList', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			responseVenue: "=" 
		},
		templateUrl: '/views/templates/venue.html'
		
	}
});