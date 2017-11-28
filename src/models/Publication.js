(function($angular) {
    'use strict';

    var app = $angular.module('pubHistogram');

    app.factory('Publication', function() {
        function Publication(year, count, mostCited) {
            this.year = year;
            this.count = count;
            this.mostCited = mostCited;
        }

        return (Publication);
    });
})(window.angular);
