
// A test Factory for bands
app.factory("Test", [function () {
    var bands = ["Six60", "Shihad", "Exponents"];
    var working = "A description of the band";

    return {
        all: function () {
            return bands;
        },
        working: function () {
            return working;
        }

    }
}]);

// The Main Controller
// todo: Are these used or needed? they were testers and can be removed if we dont need them
app.controller('MainCtrl', function ($scope, Test) {
    $scope.bands = Test.all();

});

// A test controller
// todo: Are these used or needed?
app.controller('WorkingCtrl', function ($scope, Test) {
    $scope.working = Test.working();
});




