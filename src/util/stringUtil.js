(function($angular) {
    'use strict';

    var app = $angular.module('pubHistogram');
    app.factory('stringUtil', function() {
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

        return {
            formatString: formatString
        };
    });
})(window.angular);
