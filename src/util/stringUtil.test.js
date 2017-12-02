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

    it('generateQueryByOption_queryIsAny_returnBackValue', function() {
        // Arrange
        initialize();
        var query = {id: 'ANY', value: 'search query'};

        // Act
        var str = stringUtil.generateQueryByOption(query);

        // Assert
        expect(str).toBe(query.value);
    });

    it('generateQueryByOption_queryIsOtherThanAny_returnBackValue', function() {
        // Arrange
        initialize();
        var query = {id: 'TITLE', value: 'search query'};

        // Act
        var str = stringUtil.generateQueryByOption(query);

        // Assert
        expect(str).toBe('(' + query.id + ':' + query.value + ')');
    });

    it('generateTitleByQueryOption_queryIsAny_returnBackValue', function() {
        // Arrange
        initialize();
        var query = {id: 'ANY', value: 'malaria'};

        // Act
        var str = stringUtil.generateTitleByQueryOption(query);

        // Assert
        expect(str).toBe('Publications related to "' + query.value + '"');
    });

    it('generateTitleByQueryOption_queryIsOtherThanAny_returnBackValue', function() {
        // Arrange
        initialize();
        var query = {id: 'TITLE', value: 'malaria'};

        // Act
        var str = stringUtil.generateTitleByQueryOption(query);

        // Assert
        expect(str).toBe('Publications containing the word "' + query.value + '" in '+ query.id);
    });
});
