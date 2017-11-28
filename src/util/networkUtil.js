(function($angular) {
    'use strict';

    var app = $angular.module('pubHistogram');
    app.factory('networkUtil', function($q, $http) {
        function httpGet(config) {
            var defer = $q.defer();
            config.method = 'GET',
            $http(config).then(defer.resolve, defer.reject);
            return defer.promise;
        }

        function httpMultipleGet(requests) {
            var defer = $q.defer();
            var promises = [];
            for (var i=0; i < requests.length; i++) {
                promises.push(httpGet({url: requests[i]}));
            }

            $q.all(promises).then(defer.resolve, defer.reject);

            return defer.promise;
        }

        return {
            httpGet: httpGet,
            httpMultipleGet: httpMultipleGet
        };
    });
})(window.angular);
