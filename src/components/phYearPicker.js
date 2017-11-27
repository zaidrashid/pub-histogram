(function($angular) {
    'use strict';

    var app = $angular.module('pubHistogram');
    app.component('phYearPicker', {
        templateUrl: 'components/phYearPicker.html',
        bindings: {
            startYear: '<',
            onYearUpdate: '&'
        },
        controller: function() {
            var $ctrl = this;

            $ctrl.$onChanges = function(changes) {
                var newValue = changes.startYear.currentValue;
                var oldValue = changes.startYear.previousValue;
                if (newValue != oldValue) {
                    setYear(newValue);
                }
            };

            function setYear(year) {
                year = year ? parseInt(year, 10) : new Date().getFullYear();
                $ctrl.dt = new Date(year, 0, 1, 0, 0, 0, 0);
            }

            function init() {
                setYear();
                $ctrl.format = 'yyyy';
                $ctrl.altInputFormats = 'yyyy';
                $ctrl.options = {
                    formatYear: 'yyyy',
                    startingDay: 1,
                    minMode: 'year'
                };
                $ctrl.opened = false;
            }

            $ctrl.open = function() {
                $ctrl.opened = true;
            };

            $ctrl.onDatePicked = function() {
                $ctrl.onYearUpdate({dt: $ctrl.dt});
            };

            init();
        }
    });
})(window.angular);
