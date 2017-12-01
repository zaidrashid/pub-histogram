describe('phYearPicker.test.js', function() {
    var element;
    var scope;
    var $route;
    var onYearUpdate;
    beforeEach(module('pubHistogram'));
    beforeEach(module('testtemplates'));
    beforeEach(function() {
        jasmine.clock().install();
        jasmine.clock().mockDate(new Date(2017, 0, 1));
        element = '<ph-year-picker on-year-update="onYearUpdate(dt)"></ph-year-picker>';
    });

    afterEach(function() {
        scope = null;
        element = null;
        $route = null;
        onYearUpdate = null;
        jasmine.clock().uninstall();
    });

    function initialize() {
        $route = jasmine.createSpy('route');

        module(function($provide) {
            $provide.value('$route', $route);
        });

        inject(function($rootScope, $compile) {
            scope = $rootScope.$new();
            element = $compile(element)(scope);
            scope.$digest();
            scope.onYearUpdate = onYearUpdate;
        });
    }

    it('init', function() {
        // Arrange
        initialize();

        // Act
        var controller = element.isolateScope().$ctrl;

        // Assert
        expect(controller.format).toBe('yyyy');
        expect(controller.altInputFormats).toBe('yyyy');
        expect(controller.options.formatYear).toBe('yyyy');
        expect(controller.options.startingDay).toBe(1),
        expect(controller.options.minMode).toBe('year');
        expect(controller.opened).toBe(false);
    });

    it('onOpen_scopeOpened_isTrue', function() {
        // Arrange
        initialize();

        // Act
        var controller = element.isolateScope().$ctrl;
        controller.open();

        // Assert
        expect(controller.opened).toBe(true);
    });

    it('onChange_dt_isReflected', function() {
        // Arrange
        initialize();
        var changes = {
            startYear: {
                currentValue: 2019,
                previousValue: null
            }
        };

        // Act
        var controller = element.isolateScope().$ctrl;
        controller.$onChanges(changes);

        // Assert
        expect(controller.dt instanceof Date).toBe(true);
        expect(controller.dt.getFullYear()).toBe(2019);
    });

    it('onChange_noValueChange_isReflected', function() {
        // Arrange
        initialize();
        var changes = {
            startYear: {
                currentValue: null,
                previousValue: null
            }
        };

        // Act
        var controller = element.isolateScope().$ctrl;
        controller.$onChanges(changes);

        // Assert
        expect(controller.dt instanceof Date).toBe(true);
        expect(controller.dt.getFullYear()).toBe(2017);
    });

    it('onDatePicked_onYearUpdateIsCalled', function() {
        // Arrange
        onYearUpdate = jasmine.createSpy('onYearUpdate');
        initialize();

        // Act
        var controller = element.isolateScope().$ctrl;
        controller.onDatePicked();

        // Assert
        expect(onYearUpdate).toHaveBeenCalled();
        expect(onYearUpdate).toHaveBeenCalledWith(jasmine.any(Object));
    });
});
