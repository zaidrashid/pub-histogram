(function($angular) {
    var app = $angular.module('pubHistogram');

    app.controller('searchController', function($window, $scope, publicationApiFactory, SEARCH_OPTIONS) {
        var api;
        $scope.labels = [
            {name: SEARCH_OPTIONS.ANY.str, value: SEARCH_OPTIONS.ANY.id},
            {name: SEARCH_OPTIONS.TITLE.str, value: SEARCH_OPTIONS.TITLE.id},
            {name: SEARCH_OPTIONS.ABSTRACT.str, value: SEARCH_OPTIONS.ABSTRACT.id}
        ];
        $scope.options = {id: $scope.labels[0].value};

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
                        $scope.endDate &&
                        $scope.endDate.getTime() > $scope.startDate.getTime();
            return valid;
        }

        $scope.onSearch = function() {
            if (!isQueryValid()) {
                return;
            }

            $scope.loading = true;
            $scope.options.value = $scope.searchText;
            api.search($scope.options, $scope.startDate, $scope.endDate).then(function(res) {
                $scope.loading = false;
                $scope.publications = {};
                $scope.publications.data = res.result;
                $scope.publications.title = res.title;
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
