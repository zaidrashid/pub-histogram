(function($angular) {
    $angular.module('pubHistogram', []);
    var app = $angular.module('pubHistogram');

    app.controller('mainController', function($scope) {
        $scope.message = 'Loaded';
    });
})(window.angular);
