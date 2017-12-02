(function($angular) {
    'use strict';

    var app = $angular.module('pubHistogram');
    app.factory('stringUtil', function(SEARCH_OPTIONS) {
        function formatString(format, params) {
            params = params || [];
            if (typeof params != 'object') {
                params = [params];
            }

            var result = format;
            for (var i = 0; i < params.length; i++) {
                result = replaceText(result, '{[' + i + ']}', params[i]);
            }

            return result;
        }

        function replaceText(format, oldValue, newValue) {
            return format.replace(new RegExp(oldValue, 'g'), newValue);
        }

        function generateQueryByOption(query) {
            if (query.id == SEARCH_OPTIONS.ANY.id) {
                return query.value;
            } else {
                return formatString('({0}:{1})', [query.id, query.value]);
            }
        }

        function generateTitleByQueryOption(query) {
            if (query.id == SEARCH_OPTIONS.ANY.id) {
                return formatString('Publications related to "{0}"', query.value);
            } else {
                return formatString('Publications containing the word "{0}" in {1}', [query.value, query.id]);
            }
        }

        return {
            formatString: formatString,
            generateQueryByOption: generateQueryByOption,
            generateTitleByQueryOption: generateTitleByQueryOption
        };
    });
})(window.angular);
