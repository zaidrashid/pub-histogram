(function($angular) {
    'use strict';

    var app = $angular.module('pubHistogram');

    app.constant('SEARCH_OPTIONS', {
        ANY: {id: 'ANY', str: 'by any'},
        TITLE: {id: 'TITLE', str: 'by title'},
        ABSTRACT: {id: 'ABSTRACT', str: 'by abstract'},
    });
})(window.angular);
