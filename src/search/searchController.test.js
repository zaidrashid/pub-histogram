describe('searchController.test.js', function() {
    var $scope;
    var $controller;
    var publicationApiFactory;

    beforeEach(module('pubHistogram'));
    beforeEach(function() {
        jasmine.clock().install();
        jasmine.clock().mockDate(2017, 0, 1);
    });

    afterEach(function() {
        $scope = null;
        $controller = null;
        publicationApiFactory = null;
        jasmine.clock().uninstall();
    });

    function initialize() {
        publicationApiFactory = jasmine.createSpyObj('publicationApiFactory', ['getApi']);
        module(function($provide) {
            $provide.value('publicationApiFactory', publicationApiFactory);
        });

        inject(function($injector) {
            $controller = $injector.get('$controller');
        });
    }

    it('init_setDefaultValueForYearPicker', function() {
        // Arrange
        initialize();
        $scope = {};

        // Act
        $controller('searchController', {$scope: $scope});

        // Assert
        expect($scope.startYear).toBe(2007);
        expect($scope.endYear).toBe(2017);
        expect($scope.serachText).toBeFalsy();
    });

    it('onSearch_invalidInputs_noSearchWillExecute', function() {
        // Arrange
        initialize();
        $scope = {};

        // Act
        $controller('searchController', {$scope: $scope});
        $scope.onSearch();

        // Assert
        expect($scope.publications).toBeFalsy();
    });

    it('onSearch_validInputs_searchWillReturnResults', function() {
        // Arrange
        initialize();
        publicationApiFactory.getApi.and.callFake(function() {
            return {
                search: function() {
                    return {
                        then: function(success, fail) {
                            success(true);
                        }
                    };
                }
            };
        });

        $scope = {};

        // Act
        $controller('searchController', {$scope: $scope});
        $scope.searchText = 'test';
        $scope.onSearch();

        // Assert
        expect($scope.publications).toBeTruthy();
    });

    it('onSearch_gotError_publicationsWillBeFalsy', function() {
        // Arrange
        initialize();
        publicationApiFactory.getApi.and.callFake(function() {
            return {
                search: function() {
                    return {
                        then: function(success, fail) {
                            fail(true);
                        }
                    };
                }
            };
        });

        $scope = {};

        // Act
        $controller('searchController', {$scope: $scope});
        $scope.searchText = 'test';
        $scope.onSearch();

        // Assert
        expect($scope.publications).toBeFalsy();
    });

    it('onStartYearUpdate', function() {
        // Arrange
        initialize();
        $scope = {};
        var startDate = new Date(2007, 0, 1);

        // Act
        $controller('searchController', {$scope: $scope});
        $scope.onStartYearUpdate(startDate);

        // Act
        expect($scope.startDate).toBe(startDate);
    });

    it('onEndYearUpdate', function() {
        // Arrange
        initialize();
        $scope = {};
        var endDate = new Date(2007, 0, 1);

        // Act
        $controller('searchController', {$scope: $scope});
        $scope.onEndYearUpdate(endDate);

        // Act
        expect($scope.endDate).toBe(endDate);
    });
});
