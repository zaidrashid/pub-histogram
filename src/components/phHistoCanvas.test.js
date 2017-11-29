describe('phYearPicker.test.js', function() {
    var element;
    var scope;
    var $route;
    var $window;
    beforeEach(module('pubHistogram'));
    beforeEach(module('testtemplates'));
    beforeEach(function() {
        jasmine.clock().install();
        jasmine.clock().mockDate(new Date(2017, 0, 1));
        element = '<ph-histo-canvas><div id="histogram-chart"></div></ph-histo-canvas>';
    });

    afterEach(function() {
        scope = null;
        element = null;
        $route = null;
        $window = null;
        jasmine.clock().uninstall();
    });

    function initialize() {
        $window = {
            Highcharts: jasmine.createSpyObj('Highcharts', ['chart'])
        };

        $route = jasmine.createSpy('route');
        module(function($provide) {
            $provide.value('$route', $route);
            $provide.value('$window', $window);
        });

        inject(function($rootScope, $compile) {
            scope = $rootScope.$new();
            element = $compile(element)(scope);
            scope.$digest();
        });
    }

    it('init', function() {
        // Arrange
        initialize();
        // Act
        var controller = element.isolateScope().$ctrl;

        // Assert
        expect(controller.publications).toBe(undefined);
    });
});
