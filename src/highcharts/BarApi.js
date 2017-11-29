(function($angular) {
    'use strict';
    var app = $angular.module('pubHistogram');

    app.factory('BarApi', function() {
        var title = 'Bar Chart';
        var xTitle = 'X Title';
        var xData = [];
        var yTitle = 'Y Title';
        var yData = [];
        function BarApi() {
            this.configuration = setBaseConfig();
        }

        function setBaseConfig() {
            return {
                chart: {type: 'bar'},
                title: {text: title},
                xAxis: {
                    title: {text: xTitle},
                },
                yAxis: {
                    min: 0,
                    title: {text: yTitle},
                    labels: {overflow: 'justify'}
                },
                series: [],
                plotOptions: {
                    bar: {dataLabels: {enabled: true}}
                },
                credits: {
                    enabled: false
                }
            };
        }

        function setData(publication) {
            if (!publication.length) {
                return;
            }

            for (var i=0; i<publication.length; i++) {
                var pub = publication[i];

                if (!pub.year) {
                    continue;
                }

                xData.push(parseInt(pub.year, 10));

                var yHolder = {
                    y: pub.count,
                    mostCited: pub.mostCited.title
                };
                yData.push(yHolder);
            }


            this.configuration.xAxis.categories = xData;
            this.configuration.series.push({data: yData, name: ' Publications'});
        }

        function setTitle(title) {
            this.configuration.title.text = title;
        }

        function getConfiguration() {
            return this.configuration;
        }

        BarApi.prototype = {
            setData: setData,
            setTitle: setTitle,
            getConfiguration: getConfiguration
        };

        return (BarApi);
    });
})(window.angular);
