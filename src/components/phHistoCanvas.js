
(function($angular) {
    'use strict';

    var app = $angular.module('pubHistogram');
    app.component('phHistoCanvas', {
        template: '<div id="histogram-chart"></div>',
        bindings: {
            publications: '<',
        },
        controller: function($window, chartProviderFactory) {
            var $ctrl = this;

            $ctrl.$onChanges = function(changes) {
                var newValue = changes.publications.currentValue;
                var oldValue = changes.publications.previousValue;
                if (newValue && newValue != oldValue) {
                    doChartSetup(newValue);
                }
            };

            function doChartSetup(data) {
                var chartApi = chartProviderFactory.getApi('bar');
                chartApi.setTitle('Publication across years');
                chartApi.setData(data);
                var finalConfig = chartApi.getConfiguration();
                $window.Highcharts.chart('histogram-chart', finalConfig);
            }
        }
    });
})(window.angular);
