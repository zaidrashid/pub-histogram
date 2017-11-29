(function($angular) {
    'use strict';

    var app = $angular.module('pubHistogram');

    app.service('chartProviderFactory', function(BarApi) {
        function getApi(type) {
            var chartApi;
            switch (type) {
                case 'bar':
                    chartApi = new BarApi();
                    break;
                default:
                    chartApi = setDefault();
                    break;
            }

            return chartApi;
        }

        function setDefault() {
            return new BarApi();
        }

        return {
            // Public interface
            getApi: getApi
        };
    });
})(window.angular);
