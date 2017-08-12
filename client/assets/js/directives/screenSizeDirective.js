app.directive('screenSize', ['$window', '$timeout', function($window, $timeout){

    return {
        restrict: 'E',
        template: '<div ng-include="templateUrl"></div>',
        link: function(scope) {

            $window.onresize = function() {
                changeTemplate();
                scope.$apply();
            };
            changeTemplate();

            function changeTemplate() {
                var screenWidth = $window.innerWidth;
                if (screenWidth < 768) {
                    scope.templateUrl = 'views/templates/venue-content-mobile.html';
                } else if (screenWidth >= 768) {
                    scope.templateUrl = 'views/templates/venue-content.html';
                }
            }
        }
    }
}]);