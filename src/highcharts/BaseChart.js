(function($angular) {
    'use strict';
    var app = $angular.module('pubHistogram');

    app.factory('BaseChart', function(stringUtil) {
        var baseTitle = 'Base Chart';
        var xTitle = 'X Title';
        var xData = [];
        var yTitle = 'Y Title';
        var yData = [];
        function BaseChart(title) {
            this.configuration = setBaseConfig(title);
        }

        function resetData() {
            xData = [];
            yData = [];
        }

        var toolTipFormatter = function() {
            var string = 'Publication count: <b>{0}</b><br> ' +
                        'Most Cited Publication: <b>{1}</b><br>' +
                        'By: <b>{2}</b><br>' +
                        'Cited: <b>{3} times<b>';

            return stringUtil.formatString(string,
                    [this.point.y, this.point.mostCited, this.point.by, this.point.cited]);
        };

        function setBaseConfig(title) {
            resetData();
            return {
                title: {text: title || baseTitle},
                xAxis: {
                    title: {text: xTitle},
                    categories: []
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
                },
                tooltip: {
                    formatter: toolTipFormatter
                }
            };
        }

        function setAuthorsString(authorsString) {
            if (!authorsString) {
                return 'no data';
            }

            var authors = authorsString.split(', ');
            var authorStr;
            if (authors.length == 1) {
                authorStr = authors[0];
            } else {
                authorStr = stringUtil.formatString('{0} and {1} more', [authors[0], authors.length - 1]);
            }

            return authorStr;
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
                    mostCited: pub.mostCited.title,
                    by: setAuthorsString(pub.mostCited.authorString),
                    cited: pub.mostCited.citedByCount
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

        BaseChart.prototype = {
            setData: setData,
            setTitle: setTitle,
            getConfiguration: getConfiguration
        };

        return (BaseChart);
    });
})(window.angular);
