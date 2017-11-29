describe('phYearPicker.test.js', function() {
    var element;
    var scope;
    var $route;
    beforeEach(module('pubHistogram'));
    beforeEach(module('testtemplates'));
    beforeEach(function() {
        jasmine.clock().install();
        jasmine.clock().mockDate(new Date(2017, 0, 1));
        element = '<ph-histo-canvas></ph-histo-canvas>';
    });

    afterEach(function() {
        scope = null;
        element = null;
        $route = null;
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
