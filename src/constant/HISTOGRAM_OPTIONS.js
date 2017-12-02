(function($angular) {
    'use strict';

    var app = $angular.module('pubHistogram');

    /**
     * curernt supported chartype: [
     *  'bar', 'line', 'column'
     * ]
     */
    app.constant('HISTOGRAM_OPTIONS', {
        CHARTTYPE: 'bar'
    });
})(window.angular);
