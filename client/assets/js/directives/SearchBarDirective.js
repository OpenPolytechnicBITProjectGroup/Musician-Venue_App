app.directive('searchBar', function(){
    return {
        restrict: 'E',
		scope: {
            page: "="
        },
        templateUrl: '/views/templates/searchbar.html',
        replace: true,
        link: function(scope, element, attrs) {
            console.log("In the search directive:");
        } 
        
    }
});