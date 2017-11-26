describe('publicationApiFactory.test.js', function() {
    var PmcApi;
    var publicationApiFactory;

    beforeEach(module('pubHistogram'));

    afterEach(function() {
        PmcApi = null;
        publicationApiFactory = null;
    });

    function initialize() {
        PmcApi = jasmine.createSpy('PmcApi');
        module(function($provide) {
            $provide.value('PmcApi', PmcApi);
        });

        inject(function($injector) {
            publicationApiFactory = $injector.get('publicationApiFactory');
        });
    }

    it('getPublicationApi_noType_setDefault', function() {
        // Arrange
        initialize();

        // Act
        var api = publicationApiFactory.getApi();

        // Assert
        expect(api).toEqual(jasmine.any(Object));
        expect(PmcApi).toHaveBeenCalled();
    });

    it('getPublicationApi_typePMC_setDefault', function() {
        // Arrange
        initialize();

        // Act
        var api = publicationApiFactory.getApi('pmc');

        // Assert
        expect(api).toEqual(jasmine.any(Object));
        expect(PmcApi).toHaveBeenCalled();
    });
});
