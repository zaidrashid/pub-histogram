describe('searchController.test.js', function() {
    var $scope;
    var $controller;

    beforeEach(module('pubHistogram'));
    beforeEach(function() {
        jasmine.clock().install();
    });

    afterEach(function() {
        $scope = null;
        $controller = null;
        jasmine.clock().uninstall();
    });

    function initialize() {
        inject(function($injector) {
            $controller = $injector.get('$controller');
        });
    }

    it('init_setDefaultValueForYearPicker', function() {
        // Arrange
        jasmine.clock().mockDate(2017, 0, 1);
        initialize();
        $scope = {};

        // Act
        $controller('searchController', {$scope: $scope});

        // Assert
        expect($scope.startYear).toBe(2007);
        expect($scope.endYear).toBe(2017);
    });
});
