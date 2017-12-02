(function($angular) {
    'use strict';

    var app = $angular.module('pubHistogram');

    app.factory('PmcApi', function($q, networkUtil, stringUtil, dateUtil, publicationUtil, PMC_API_OPTIONS, SEARCH_OPTIONS) {
        var config = PMC_API_OPTIONS.CONFIG;

        function PmcApi() { }

        function generateSearchTitle(query, startYear, endYear) {
            var startYearStr = dateUtil.dateToString(startYear, 'YYYY');
            var endYearStr = dateUtil.dateToString(endYear, 'YYYY');
            var yearSubTitle = startYearStr === endYearStr ?
                                stringUtil.formatString('in the year {0}', startYearStr) :
                                stringUtil.formatString('between {0} to {1}', [startYearStr, endYearStr]);

            var startTitle = stringUtil.generateTitleByQueryOption(query);
            return stringUtil.formatString('{0} {1}', [startTitle, yearSubTitle]);
        }

        function search(query, startYear, endYear) {
            var defer = $q.defer();
            var years = dateUtil.separateYears(startYear, endYear);

            var requests = [];
            for (var i=0; i < years.length; i++) {
                requests.push(generateRequest(query, years[i].dateStart, years[i].dateEnd));
            }

            networkUtil.httpMultipleGet(requests).then(function(res) {
                var result = publicationUtil.generatePublicationDataByYears(res);
                var title = generateSearchTitle(query, startYear, endYear);
                defer.resolve({result: result, title: title});
            }, defer.reject);
            return defer.promise;
        }

        function addAditionalOptions(query) {
            for (var i=0; i < config.options.length; i++) {
                var newKey = config.options[i].key;
                var newVal = encodeURIComponent(config.options[i].value);
                query += stringUtil.formatString('&{0}={1}', [newKey, newVal]);
            }

            return query;
        }

        function generateQuery(query, startYear, endYear) {
            var dateRange = dateUtil.generateDateRangeString(startYear, endYear);
            var queryStr = stringUtil.generateQueryByOption(query);
            var queryString = stringUtil.formatString('{0} AND {1}', [queryStr, dateRange]);

            var encodedQuery = encodeURIComponent(queryString);
            var baseQuery = stringUtil.formatString('{0}={1}', [config.type, encodedQuery]);
            var finalQuery = addAditionalOptions(baseQuery);
            return finalQuery;
        }

        function generateRequest(query, startYear, endYear) {
            var queryString = generateQuery(query, startYear, endYear);
            return stringUtil.formatString('{0}{1}', [config.baseUrl, queryString]);
        }

        PmcApi.prototype = {
            config: config,
            search: search
        };

        return (PmcApi);
    });
})(window.angular);
