(function($angular) {
    var app = $angular.module('pubHistogram');

    app.controller('searchController', function($window, $scope, publicationApiFactory) {
        var api;

        function init() {
            var currentYear = new Date().getFullYear();

            $scope.startYear = currentYear - 10;
            $scope.endYear = currentYear;

            $scope.startDate = new Date($scope.startYear, 0, 1);
            $scope.endDate = new Date($scope.endYear, 0, 1);
            api = publicationApiFactory.getApi();
        }

        function isQueryValid() {
            var valid = $scope.searchText &&
                        $scope.startDate &&
                        $scope.endDate;
            return valid;
        }

        $scope.onSearch = function() {
            if (!isQueryValid()) {
                return;
            }

            $scope.loading = true;
            api.search($scope.searchText, $scope.startDate, $scope.endDate).then(function(res) {
                $scope.loading = false;
                $scope.publications = res;
            }, function(err) {
                $window.console.log(err);
            });
        };

        $scope.onStartYearUpdate = function(dt) {
            $scope.startDate = dt;
        };

        $scope.onEndYearUpdate = function(dt) {
            $scope.endDate = dt;
        };

        init();
    });
})(window.angular);
