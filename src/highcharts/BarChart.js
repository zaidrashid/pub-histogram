(function($angular) {
    'use strict';
    var app = $angular.module('pubHistogram');

    app.factory('BarChart', function(BaseChart) {
        var baseTitle = 'Bar Chart: ';
        var base;
        function BarChart(title) {
            base = new BaseChart(baseTitle + (title || ''));
            base.configuration.chart = {type: 'bar'};
        }

        function setData(data) {
            base.setData(data);
        }

        function setTitle(title) {
            title = baseTitle + title;
            base.setTitle(title);
        }

        function getConfiguration() {
            return base.getConfiguration();
        }

        BarChart.prototype = {
            setData: setData,
            setTitle: setTitle,
            getConfiguration: getConfiguration
        };

        return (BarChart);
    });
})(window.angular);
