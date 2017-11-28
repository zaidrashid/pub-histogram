describe('networkUtil.test.js', function() {
    var networkUtil;
    var $q;
    var $http;

    beforeEach(module('pubHistogram'));
    afterEach(function() {
        $http = null;
        $q = null;
        networkUtil = null;
    });

    function initialize() {
        $http = jasmine.createSpy('$http');
        module(function($provide) {
            $provide.value('$http', $http);
        });

        inject(function($injector) {
            networkUtil = $injector.get('networkUtil');
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

        $http.and.returnValue($q.resolve());
    }

    it('httpget_success', function() {
        // Arrange
        var config = {
            url: 'http://test.url.com'
        };
        initialize();
        var defer = $q.defer();
        defer.resolve({get: true, res: 'res'});
        $http.and.returnValue(defer.promise);

        // Act
        networkUtil.httpGet(config).then(function(res) {
            expect(res.get).toBe(true);
            expect($http).toHaveBeenCalled();
            expect($http).toHaveBeenCalledWith(config);
        });
    });

    it('httpget_error', function() {
        // Arrange
        var config = {
            url: 'http://test.url.com'
        };
        initialize();
        var defer = $q.defer();
        defer.reject({err: true, res: 'res'});
        $http.and.returnValue(defer.promise);

        // Act
        networkUtil.httpGet(config).then(function(res) { },
            function(err) {
                expect(err.err).toBe(true);
                expect($http).toHaveBeenCalled();
                expect($http).toHaveBeenCalledWith(config);
        });
    });

    it('httpmultipleget_success', function() {
        // Arrange
        var urls = [
            'http://test.url.com',
            'http://test.url.2.com'
        ];

        initialize();
        $q.all = function(promises) {
            return {
                then: function(callback) {
                        callback(urls);
                    }
            };
        };

        // Act
        networkUtil.httpMultipleGet(urls).then(function(res) {
            expect(res).toEqual(jasmine.any(Array));
            expect(res.length).toBe(2);
        });
    });
});
