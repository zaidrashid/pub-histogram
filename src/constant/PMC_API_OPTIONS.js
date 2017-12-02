(function($angular) {
    'use strict';

    var app = $angular.module('pubHistogram');

    app.constant('PMC_API_OPTIONS', {
        CONFIG: {
            type: 'query',
            baseUrl: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search/',
            options: [
                {key: 'sort', value: 'CITED desc'},
                {key: 'format', value: 'JSON'},
                {key: 'pageSize', value: 1}
            ]
        }
    });
})(window.angular);
