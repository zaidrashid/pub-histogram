describe('stringUtil.test.js', function() {
    var stringUtil;

    beforeEach(module('pubHistogram'));
    afterEach(function() {
        stringUtil = null;
    });

    function initialize() {
        inject(function($injector) {
            stringUtil = $injector.get('stringUtil');
        });
    }

    it('formatString_singleReplacement_replaceSuccess', function() {
        // Arrange
        initialize();

        // Act
        var str = stringUtil.formatString('{0} will be replace', 'This');

        // Assert
        expect(str).toBe('This will be replace');
    });

    it('formatString_multipleReplacement_replaceSuccess', function() {
        // Arrange
        initialize();
        var replaceWords = ['This', 'also these', 'replace'];
        // Act
        var str = stringUtil.formatString('{0} and {1} will be {2}', replaceWords);

        // Assert
        expect(str).toBe('This and also these will be replace');
    });

    it('formatString_noParamsGive_nothingIsReplace', function() {
        // Arrange
        initialize();
        // Act
        var str = stringUtil.formatString('{0} and {1} will be {2}', null);

        // Assert
        expect(str).toBe('{0} and {1} will be {2}');
    });
});
