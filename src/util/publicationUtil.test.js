describe('publicationUtil.test.js', function() {
    var publicationUtil;

    beforeEach(module('pubHistogram'));
    afterEach(function() {
        publicationUtil = null;
    });

    function initialize() {
        inject(function($injector) {
            publicationUtil = $injector.get('publicationUtil');
        });
    }

    it('generatePublicationDataByYears_resIsInvalid_returnUndefined', function() {
        // Arrange
        initialize();
        var res = {};

        // Act
        var result = publicationUtil.generatePublicationDataByYears(res);

        // Assert
        expect(result).toBeFalsy();
    });

    it('generatePublicationDataByYears_resLengthIs0_returnUndefined', function() {
        // Arrange
        initialize();
        var res = [];

        // Act
        var result = publicationUtil.generatePublicationDataByYears(res);
        // Assert
        expect(result).toBeFalsy();
    });

    it('generatePublicationDataByYears_resIsValid_returnUndefined', function() {
        // Arrange
        initialize();
        var res = [
            {
                data: {
                    hitCount: 250,
                    resultList: {
                        result: [
                            {
                                id: 1,
                                pubYear: '2008',
                                title: 'has title'
                            }
                        ]
                    }
                },
            }, {
                data: {
                    resultList: {
                        result: [
                            {
                                id: 2,
                                pubYear: '2009',
                                title: 'has title 2'
                            }
                        ]
                    }
                },
            }
        ];

        // Act
        var result = publicationUtil.generatePublicationDataByYears(res);
        // Assert
        expect(result).toBeTruthy();
        expect(result.length).toBe(2);
        expect(result[1].count).toBe(0);
    });

    it('generatePublicationDataByYears_resIsValid_dataHasNoResult', function() {
        // Arrange
        initialize();
        var res = [
            {
                data: {
                    resultList: {
                    }
                },
            }
        ];

        // Act
        var result = publicationUtil.generatePublicationDataByYears(res);
        // Assert
        expect(result).toBeTruthy();
        expect(result.length).toBe(1);
    });

    it('generatePublicationDataByYears_resIsValid_skipIfNoData', function() {
        // Arrange
        initialize();
        var res = [
            {
                data: {
                    hitCount: 250,
                    resultList: {
                        result: [
                            {
                                id: 1,
                                pubYear: '2008',
                                title: 'has title'
                            }
                        ]
                    }
                },
            },
            {
                somethingElse: {
                    hitCount: 250,
                    resultList: {
                        result: [
                            {
                                id: 1,
                                pubYear: '2008',
                                title: 'has title'
                            }
                        ]
                    }
                },
            }
        ];

        // Act
        var result = publicationUtil.generatePublicationDataByYears(res);
        // Assert
        expect(result).toBeTruthy();
        expect(result.length).toBe(1);
    });
});
