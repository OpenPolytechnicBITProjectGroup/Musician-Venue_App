app.directive('venueList', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			responseVenue: "=" 
		},
		//templateUrl: 'venue.html'
		
		template: 
		'<div class="col-xs-12 col-md-6 col-lg-3">' +
			'<div class="card">' +
				'<h4>{{responseVenue.name}}</h4>' +
				'<ul>' +
					'<li>Location: {{responseVenue.location}}</li>' +
					'<li>Capacity: {{responseVenue.capacity}}</li>' +
					'<li>Preferred Genres: <span ng-repeat="genre in responseVenue.genres">{{genre}}{{$last ? "" : ", "}}</span></li>' +
				'</ul>' +
			'</div>' +
		'</div>'
		
	}
});