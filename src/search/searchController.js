(function($angular) {
    var app = $angular.module('pubHistogram');

    app.controller('searchController', function($scope) {
        function init() {
            var currentYear = new Date().getFullYear();

            $scope.startYear = currentYear - 10;
            $scope.endYear = currentYear;
        }

        init();
    });
})(window.angular);
