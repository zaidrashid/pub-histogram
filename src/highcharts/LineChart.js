(function($angular) {
    'use strict';
    var app = $angular.module('pubHistogram');

    app.factory('LineChart', function(BaseChart) {
        var baseTitle = 'Line Chart: ';
        var base;
        function LineChart(title) {
            base = new BaseChart(baseTitle + (title || ''));
            base.configuration.chart = {type: 'line'};
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

        LineChart.prototype = {
            setData: setData,
            setTitle: setTitle,
            getConfiguration: getConfiguration
        };

        return (LineChart);
    });
})(window.angular);
