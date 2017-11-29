describe('chartProviderFactory.test.js', function() {
    var BarApi;
    var chartProviderFactory;

    beforeEach(module('pubHistogram'));

    afterEach(function() {
        BarApi = null;
        chartProviderFactory = null;
    });

    function initialize() {
        BarApi = jasmine.createSpy('BarApi');
        module(function($provide) {
            $provide.value('BarApi', BarApi);
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
        expect(BarApi).toHaveBeenCalled();
    });

    it('getApi_typePMC_setDefault', function() {
        // Arrange
        initialize();

        // Act
        var api = chartProviderFactory.getApi('bar');

        // Assert
        expect(api).toEqual(jasmine.any(Object));
        expect(BarApi).toHaveBeenCalled();
    });
});
