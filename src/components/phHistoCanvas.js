
(function($angular) {
    'use strict';

    var app = $angular.module('pubHistogram');
    app.component('phHistoCanvas', {
        template: '<div id="histogram-chart"></div>',
        bindings: {
            publications: '<',
        },
        controller: function() {
            var $ctrl = this;

            // title = 
            // xAxis.categories = [array]
            // series.data = array of number
            // var chartConfig = {
            //         chart: {
            //             type: 'bar'
            //         },
            //         title: {
            //             text: 'Historic World Population by Region'
            //         },
            //         xAxis: {
            //             title: {
            //                 text: Years
            //             }
            //         },
            //         yAxis: {
            //             min: 0,
            //             title: {
            //                 text: 'Number of publication',
            //                 align: 'high'
            //             },
            //             labels: {
            //                 overflow: 'justify'
            //             }
            //         },
            //         tooltip: {
            //             valueSuffix: ' millions'
            //         },
            //         plotOptions: {
            //             bar: {
            //                 dataLabels: {
            //                     enabled: true
            //                 }
            //             }
            //         },
            //         credits: {
            //             enabled: true,
            //             href: 'https://europepmc.org/RestfulWebService',
            //             text: 'Europe PMC'
            //         },
            //         series: [{
            //             name: 'Publication',
            //             data: [107, 31, 635, 203, 2]
            //         }]
            //     };

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
            };

            function doChartSetup() {
                Highcharts.chart('histogram-chart', config);
            }

            function init() {
                if (!$ctrl.publications || $ctrl.publications.length) {
                    // show default
                }

                doChartSetup();
            }

            init();
        }
    });
})(window.angular);
