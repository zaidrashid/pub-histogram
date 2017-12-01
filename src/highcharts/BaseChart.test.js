describe('BaseChart.test.js', function() {
    var BaseChart;

    beforeEach(module('pubHistogram'));
    beforeEach(function() {
        BaseChart = null;
    });

    function initialize() {
        inject(function($injector) {
            BaseChart = $injector.get('BaseChart');
        });
    }

    it('setTitle_titleIsNotGiven_defaultTitleSet', function() {
        // Arrange
        initialize();

        // Act
        var Base = new BaseChart();

        // Assert
        expect(Base.configuration.title.text).toBe('Base Chart');
    });

    it('setTitle_titleGiven_netTitleSet', function() {
        // Arrange
        initialize();

        // Act
        var Base = new BaseChart();
        Base.setTitle('new title');

        // Assert
        expect(Base.configuration.title.text).toBe('new title');
    });

    it('setData_dataIsValid_xyDataIsSet', function() {
        // Arrange
        initialize();
        var publicationMockData = [
            {year: '2017', count: '250', mostCited: {title: 'title#001'}},
            {year: '2018', count: '251', mostCited: {title: 'title#002'}},
            {year: '2019', count: '252', mostCited: {title: 'title#003'}},
            {year: '2020', count: '253', mostCited: {title: 'title#004'}},
        ];

        // Act
        var base = new BaseChart();
        base.setData(publicationMockData);
        var config = base.getConfiguration();

        // Assert
        expect(config.title.text).toBe('Base Chart');
        expect(config.xAxis.categories).toEqual(jasmine.any(Array));
        expect(config.xAxis.categories.length).toEqual(4);
        expect(config.xAxis.categories[0]).toEqual(jasmine.any(Number));
        expect(config.series).toEqual(jasmine.any(Array));
        expect(config.series[0].data).toEqual(jasmine.any(Array));
        expect(config.series[0].data.length).toEqual(4);
    });

    it('setData_someDataMissingYear_xyDataIsSetAccordingly', function() {
        // Arrange
        initialize();
        var publicationMockData = [
            {year: '2017', count: '250', mostCited: {title: 'title#001'}},
            {year: '2018', count: '251', mostCited: {title: 'title#002'}},
            {year: '', count: '252', mostCited: {title: 'title#003'}},
            {year: '2020', count: '253', mostCited: {title: 'title#004'}},
        ];

        // Act
        var base = new BaseChart();
        base.setData(publicationMockData);
        var config = base.getConfiguration();

        // Assert
        expect(config.title.text).toBe('Base Chart');
        expect(config.xAxis.categories).toEqual(jasmine.any(Array));
        expect(config.xAxis.categories.length).toEqual(3);
        expect(config.xAxis.categories[0]).toEqual(jasmine.any(Number));
        expect(config.series).toEqual(jasmine.any(Array));
        expect(config.series[0].data).toEqual(jasmine.any(Array));
        expect(config.series[0].data.length).toEqual(3);
    });

    it('setData_dataIsInvalid_xyDataIsNotSet', function() {
        // Arrange
        initialize();
        var publicationMockData = [];

        // Act
        var base = new BaseChart();
        base.setData(publicationMockData);
        var config = base.getConfiguration();

        // Assert
        expect(config.title.text).toBe('Base Chart');
        expect(config.xAxis.categories).toEqual(jasmine.any(Array));
        expect(config.xAxis.categories.length).toEqual(0);
        expect(config.series).toEqual(jasmine.any(Array));
        expect(config.series.length).toEqual(0);
    });
});
