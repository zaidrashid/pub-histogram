describe('chartProviderFactory.test.js', function() {
    var BarChart;
    var LineChart;
    var ColumnChart;
    var chartProviderFactory;

    beforeEach(module('pubHistogram'));

    afterEach(function() {
        BarChart = null;
        LineChart = null;
        ColumnChart = null;
        chartProviderFactory = null;
    });

    function initialize() {
        BarChart = jasmine.createSpy('BarChart');
        LineChart = jasmine.createSpy('LineChart');
        ColumnChart = jasmine.createSpy('ColumnChart');
        module(function($provide) {
            $provide.value('BarChart', BarChart);
            $provide.value('LineChart', LineChart);
            $provide.value('ColumnChart', ColumnChart);
        });

        inject(function($injector) {
            chartProviderFactory = $injector.get('chartProviderFactory');
        });
    }

    it('getApi_noType_setDefault', function() {
        // Arrange
        initialize();

        // Act
        var api = chartProviderFactory.getApi();

        // Assert
        expect(api).toEqual(jasmine.any(Object));
        expect(LineChart).toHaveBeenCalled();
    });

    it('getApi_typeBar_setBar', function() {
        // Arrange
        initialize();

        // Act
        var api = chartProviderFactory.getApi('bar');

        // Assert
        expect(api).toEqual(jasmine.any(Object));
        expect(BarChart).toHaveBeenCalled();
    });

    it('getApi_typeColumn_setBar', function() {
        // Arrange
        initialize();

        // Act
        var api = chartProviderFactory.getApi('column');

        // Assert
        expect(api).toEqual(jasmine.any(Object));
        expect(ColumnChart).toHaveBeenCalled();
    });
});
