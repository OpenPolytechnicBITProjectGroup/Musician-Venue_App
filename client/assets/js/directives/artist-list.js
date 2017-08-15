app.directive('artistList', function() {
	return {
		restrict: 'E',
		scope: {
			responseArtist: '='	
		},
		templateUrl: '/views/templates/artist.html'
	}
});