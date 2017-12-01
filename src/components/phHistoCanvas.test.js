describe('phYearPicker.test.js', function() {
    var element;
    var scope;
    var $route;
    var $window;
    var chartProviderFactory;
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
        chartProviderFactory = jasmine.createSpyObj('chartProviderFactory', ['getApi']);
        module(function($provide) {
            $provide.value('$route', $route);
            $provide.value('$window', $window);
            $provide.value('chartProviderFactory', chartProviderFactory);
        });

        inject(function($rootScope, $compile) {
            scope = $rootScope.$new();
            element = $compile(element)(scope);
            scope.$digest();
        });

        chartProviderFactory.getApi.and.callFake(function() {
            return {
                setTitle: jasmine.createSpy('setTitle'),
                setData: jasmine.createSpy('setData'),
                getConfiguration: function() {
                    return {test: 'fake-config'};
                }
            };
        });
    }

    it('init', function() {
        // Arrange
        initialize();
        // Act
        var controller = element.isolateScope().$ctrl;
        var changes = {
            publications: {
                currentValue: [1, 2, 3],
                previousValue: [1, 2, 3, 4],
            }
        };
        controller.$onChanges(changes);
        // Assert
        expect(chartProviderFactory.getApi).toHaveBeenCalledWith('bar');
        expect($window.Highcharts.chart).toHaveBeenCalledWith('histogram-chart', jasmine.any(Object));
    });
});
