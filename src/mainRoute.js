(function($angular) {
    var angular = $angular;
    var app = angular.module('pubHistogram');
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/landing', {
                templateUrl: 'landing/landing.html'
            }).
            otherwise({
                redirectTo: '/landing'
            });
    }]);
})(window.angular);
