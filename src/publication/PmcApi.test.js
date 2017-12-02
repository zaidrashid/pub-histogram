describe('PmcApi.test.js', function() {
    var PmcApi;
    var $q;
    var networkUtil;
    var publicationUtil;

    beforeEach(module('pubHistogram'));
    beforeEach(function() {
        jasmine.clock().install();
    });
    afterEach(function() {
        PmcApi = null;
        $q = null;
        networkUtil = null;
        publicationUtil = null;
        jasmine.clock().uninstall();
    });

    function initialize() {
        networkUtil = jasmine.createSpyObj('networkUtil', ['httpMultipleGet']);
        publicationUtil = jasmine.createSpyObj('publicationutil', ['generatePublicationDataByYears']);
        module(function($provide) {
            $provide.value('networkUtil', networkUtil);
            $provide.value('publicationUtil', publicationUtil);
        });

        inject(function($injector) {
            PmcApi = $injector.get('PmcApi');
            $q = $injector.get('$q');
        });

        $q.defer = function() {
            var isResolved;
            var isReject;
            var result;
            var results = [];
            this.resolve = function(data) {
                isResolved = true;
                result = data;
                var resultData = {
                    id: results.length,
                    data: data,
                    isSuccess: true
                };

                results.push(resultData);
                return this.promise;
            };

            this.reject = function(err) {
                isReject = true;
                result = err;
                var resultData = {
                    id: results.length,
                    data: err,
                    isSuccess: false
                };

                results.push(resultData);
                return this.promise;
            };

            this.promise = {
                getResults: function() {
                    return results;
                },
                then: function(success, error) {
                    if (isReject && error) {
                        isResolved = false;
                        isReject = false;
                        error(result);
                    } else if (isResolved && success) {
                        isResolved = false;
                        isReject = false;
                        success(result);
                    }
                }
            };

            return this;
        };

        networkUtil.httpMultipleGet.and.returnValue($q.resolve());
    }

    it('init_initializeWithBaseConfig', function() {
        // Arrange
        initialize();
        var api = new PmcApi();
        // Act
        expect(api).toBeTruthy();
        expect(api.search).toEqual(jasmine.any(Function));
        expect(api.config).toBeTruthy();
        expect(api.config.baseUrl).toBe('https://www.ebi.ac.uk/europepmc/webservices/rest/search/');
        expect(api.config.options).toEqual(jasmine.any(Array));
        expect(api.config.options[0].value).toBe('CITED desc');
        expect(api.config.options[0].key).toBe('sort');
        expect(api.config.options[1].value).toBe('JSON');
        expect(api.config.options[1].key).toBe('format');
        expect(api.config.type).toBe('query');
    });

    it('search_searchWillProduceCorrectString', function() {
        // Arrange
        var query = {id: 'ANY', value: 'malaria'};
        var finalQuery = [
            'https://www.ebi.ac.uk/europepmc/webservices/rest/search/query=malaria%20AND%20(FIRST_PDATE%3A%5B2016-01-01%20TO%202016-12-31%5D)&sort=CITED%20desc&format=JSON&pageSize=1',
            'https://www.ebi.ac.uk/europepmc/webservices/rest/search/query=malaria%20AND%20(FIRST_PDATE%3A%5B2017-01-01%20TO%202017-12-31%5D)&sort=CITED%20desc&format=JSON&pageSize=1'];
        var startDate = new Date(2016, 0, 1);
        var endDate = new Date(2017, 11, 31);
        initialize();
        var defer = $q.defer();
        defer.resolve({search: true, res: 'res'});
        networkUtil.httpMultipleGet.and.returnValue(defer.promise);
        var api = new PmcApi();

        // Act
        api.search(query, startDate, endDate).then(function(res) {
            expect(networkUtil.httpMultipleGet).toHaveBeenCalled();
            expect(networkUtil.httpMultipleGet).toHaveBeenCalledWith(finalQuery);
            expect(res.title).toBe('Publications related to "malaria" between 2016 to 2017');
        });
    });

    it('search_searchWillProduceCorrectString_withTitle', function() {
        // Arrange
        var query = {id: 'ANY', value: 'malaria'};
        var finalQuery = [
            'https://www.ebi.ac.uk/europepmc/webservices/rest/search/query=malaria%20AND%20(FIRST_PDATE%3A%5B2016-01-01%20TO%202016-12-31%5D)&sort=CITED%20desc&format=JSON&pageSize=1'
        ];
        var startDate = new Date(2016, 0, 1);
        var endDate = new Date(2016, 11, 31);
        initialize();
        var defer = $q.defer();
        defer.resolve({search: true, res: 'res'});
        networkUtil.httpMultipleGet.and.returnValue(defer.promise);
        var api = new PmcApi();

        // Act
        api.search(query, startDate, endDate).then(function(res) {
            expect(networkUtil.httpMultipleGet).toHaveBeenCalled();
            expect(networkUtil.httpMultipleGet).toHaveBeenCalledWith(finalQuery);
            expect(res.title).toBe('Publications related to "malaria" in the year 2016');
        });
    });
});
