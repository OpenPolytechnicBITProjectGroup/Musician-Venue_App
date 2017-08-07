app.directive('venueList', function() {
	return {
		restrict: 'E',
		templateUrl: 'venue.html',
		replace: true,
		scope: {
			responseVenue: "=" 
		}
		
	}
});