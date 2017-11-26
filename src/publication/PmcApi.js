(function($angular) {
    'use strict';

    var app = $angular.module('pubHistogram');

    app.factory('PmcApi', function($q, networkUtil, stringUtil, dateUtil) {
        var config = {
            type: 'query',
            baseUrl: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search/',
            options: [
                {key: 'sort', value: 'CITED desc'},
                {key: 'format', value: 'JSON'},
                {key: 'pageSize', value: 1}
            ]
        };

        function PmcApi() { }

        function executeRequest(requests) {
            var defer = $q.defer();
            var promises = [];
            for (var i=0; i < requests.length; i++) {
                promises.push(networkUtil.httpGet({url: requests[i]}));
            }

            $q.all(promises).then(defer.resolve, defer.reject);

            return defer.promise;
        }

        function search(query, startYear, endYear) {
            var defer = $q.defer();
            var years = dateUtil.separateYears(startYear, endYear);

            var requests = [];
            for (var i=0; i < years.length; i++) {
                requests.push(generateRequest(query, years[i].dateStart, years[i].dateEnd));
            }

            executeRequest(requests).then(defer.resolve, defer.reject);
            return defer.promise;
        }

        function generateDateRange(startYear, endYear) {
            var q = '(FIRST_PDATE:[{0} TO {1}])';
            return stringUtil.formatString(q, [startYear, endYear]);
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
            var dateRange = generateDateRange(startYear, endYear);
            var queryString = stringUtil.formatString('{0} AND {1}', [query, dateRange]);

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
