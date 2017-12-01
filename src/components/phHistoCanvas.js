
(function($angular) {
    'use strict';

    var app = $angular.module('pubHistogram');
    app.component('phHistoCanvas', {
        templateUrl: 'components/phHistoCanvas.html',
        bindings: {
            publications: '<',
            loading: '<'
        },
        controller: function($window, chartProviderFactory) {
            var $ctrl = this;
            $ctrl.loading = false;

            $ctrl.$onChanges = function(changes) {
                if (changes.publications) {
                    var newValue = changes.publications.currentValue;
                    var oldValue = changes.publications.previousValue;
                    if (newValue && newValue != oldValue) {
                        doChartSetup(newValue);
                    }
                }

                if (changes.loading) {
                    var loading = changes.loading.currentValue;
                    $ctrl.loading = loading;
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
