
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

            // title = 
            // xAxis.categories = [array]
            // series.data = array of number
            var config = {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Historic World Population by Region'
                },
                subtitle: {
                    text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
                },
                xAxis: {
                    categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Population (millions)',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    valueSuffix: ' millions',
                    formatter: function() {
                        return 'Extra data: <b>' + this.point.str + '</b><br> Another Data: <b>';
                    }
                },
                series: [{
                    name: 'Year 1800',
                    data: [
                        {
                            y: 107,
                            str: 'satu kosong tujuh'
                        },
                        {
                            y: 31,
                            str: 'tiga satu'
                        },
                        {
                            y: 635,
                            str: 'enam tiga lima'
                        },
                        {
                            y: 203,
                            str: 'dua kosong tiga'
                        },
                        {
                            y: 2,
                            str: '2'
                        }]
                }]
            };

            $ctrl.$onChanges = function(changes) {
                console.log('changes', changes);
                var newValue = changes.publications.currentValue;
                var oldValue = changes.publications.previousValue;
                if (newValue && newValue != oldValue) {
                    doChartSetup(newValue);
                }
            };

            function doChartSetup(data) {
                var chartApi = chartProviderFactory.getApi();
                chartApi.setTitle('Publication accross years');
                chartApi.setData(data);
                var finalConfig = chartApi.getConfiguration();
                console.log(config);
                console.log(finalConfig);
                $window.Highcharts.chart('histogram-chart', finalConfig);
            }

            function init() {
                if (!$ctrl.publications || !$ctrl.publications.length) {
                    // show default
                }
            }

            init();
        }
    });
})(window.angular);
