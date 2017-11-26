(function($angular) {
    'use strict';

    var app = $angular.module('pubHistogram');
    app.factory('networkUtil', function($q, $http) {
        function httpGet(config) {
            var promise = $q.defer();
            config.method = 'GET',
            $http(config).then(promise.resolve, promise.reject);
            return promise.promise;
        }

        return {
            httpGet: httpGet
        };
    });
})(window.angular);
