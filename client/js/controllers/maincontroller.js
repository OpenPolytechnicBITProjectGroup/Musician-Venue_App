
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
app.controller('MainCtrl', function ($scope, Test) {
    $scope.bands = Test.all();

});

// A test controller   
app.controller('WorkingCtrl', function ($scope, Test) {
    $scope.working = Test.working();
});




