(function($angular) {
    'use strict';
    var app = $angular.module('pubHistogram');

    app.factory('ColumnChart', function(BaseChart) {
        var baseTitle = 'Column Chart: ';
        var base;
        function ColumnChart(title) {
            base = new BaseChart(baseTitle + (title || ''));
            base.configuration.chart = {type: 'column'};
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

        ColumnChart.prototype = {
            setData: setData,
            setTitle: setTitle,
            getConfiguration: getConfiguration
        };

        return (ColumnChart);
    });
})(window.angular);
