(function($angular) {
    'use strict';

    var app = $angular.module('pubHistogram');

    app.service('chartProviderFactory', function(BarChart, ColumnChart, LineChart) {
        function getApi(type) {
            var chartApi;
            switch (type) {
                case 'bar':
                    chartApi = new BarChart();
                    break;
                case 'column':
                    chartApi = new ColumnChart();
                    break;
                default:
                    chartApi = setDefault();
                    break;
            }

            return chartApi;
        }

        function setDefault() {
            return new LineChart();
        }

        return {
            // Public interface
            getApi: getApi
        };
    });
})(window.angular);
