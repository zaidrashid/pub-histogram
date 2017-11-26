(function($angular) {
    'use strict';

    var app = $angular.module('pubHistogram');

    app.service('publicationApiFactory', function(PmcApi) {
        function getApi(type) {
            var publicationApi;
            switch (type) {
                case 'pmc':
                    publicationApi = new PmcApi();
                    break;
                default:
                    publicationApi = setDefault();
                    break;
            }

            return publicationApi;
        }

        function setDefault() {
            return new PmcApi();
        }

        return {
            // Public interface
            getApi: getApi
        };
    });
})(window.angular);
