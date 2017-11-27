(function($angular) {
    var app = $angular.module('pubHistogram');

    app.controller('searchController', function($scope, publicationApiFactory) {
        var api;
        var search = {};

        function init() {
            var currentYear = new Date().getFullYear();

            $scope.startYear = currentYear - 10;
            $scope.endYear = currentYear;

            search.start = new Date($scope.startYear);
            search.end = new Date($scope.endYear);
            api = publicationApiFactory.getApi();
        }

        $scope.onSearch = function() {
            search.query = $scope.searchText;
            console.log(search.query);
            console.log(search.start);
            console.log(search.end);
            api.search(search.query, search.start, search.end).then(function(res) {
                console.log('success');
                console.log(res);
            }, function(err) {
                console.log(err);
            });
        };

        $scope.onStartYearUpdate = function(dt) {
            search.start = dt;
        };

        $scope.onEndYearUpdate = function(dt) {
            search.end = dt;
        };

        init();
    });
})(window.angular);
