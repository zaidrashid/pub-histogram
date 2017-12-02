(function($angular) {
    'use strict';

    var app = $angular.module('pubHistogram');
    app.factory('dateUtil', function(stringUtil) {
        var config = {
            DATE_FORMAT: 'YYYY-MM-DD'
        };

        function isDate(date) {
            return date instanceof Date;
        }

        function dateToString(date, format) {
            format = format || config.DATE_FORMAT;
            if (!isDate(date)) {
                return '';
            }
            return moment(date).format(format);
        }

        function separateYears(start, end) {
            if (!isDate(start) || !isDate(end)) {
                return [];
            }

            var separatedYears = [];
            var startYear = start.getFullYear();
            var endYear = end.getFullYear();
            var totalYears = endYear - startYear;

            for (var i = 0; i <= totalYears; i++) {
                var newYear = startYear + i;
                var dateStart = dateToString(new Date(newYear, 0, 1));
                var dateEnd = dateToString(new Date(newYear, 11, 31));
                separatedYears.push({dateStart: dateStart, dateEnd: dateEnd});
            }

            return separatedYears;
        }

        function generateDateRangeString(startYear, endYear) {
            var q = '(FIRST_PDATE:[{0} TO {1}])';
            return stringUtil.formatString(q, [startYear, endYear]);
        }

        return {
            dateToString: dateToString,
            separateYears: separateYears,
            generateDateRangeString: generateDateRangeString
        };
    });
})(window.angular);
