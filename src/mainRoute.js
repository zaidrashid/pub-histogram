(function($angular) {
    var angular = $angular;
    var app = angular.module('pubHistogram');
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/search', {
                templateUrl: 'search/search.html'
            }).
            otherwise({
                redirectTo: '/search'
            });
    }]);
})(window.angular);
