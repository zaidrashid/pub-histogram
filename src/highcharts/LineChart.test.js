describe('LineChart.test.js', function() {
    var LineChart;

    beforeEach(module('pubHistogram'));
    beforeEach(function() {
        LineChart = null;
    });

    function initialize() {
        inject(function($injector) {
            LineChart = $injector.get('LineChart');
        });
    }

    it('init_noTitleIsGiven', function() {
        // Arrange
        initialize();

        // Act
        var bar = new LineChart();
        var config = bar.getConfiguration();

        // Assert
        expect(config.title.text).toBe('Line Chart: ');
    });

    it('init_titleIsGiven', function() {
        // Arrange
        initialize();

        // Act
        var bar = new LineChart('Initialize title');
        var config = bar.getConfiguration();

        // Assert
        expect(config.title.text).toBe('Line Chart: Initialize title');
    });

    it('setTitle_titleIsGiven_setWithNewTitle', function() {
        // Arrange
        initialize();
        var bar = new LineChart('Initialize title');

        // Act
        bar.setTitle('new title');
        var config = bar.getConfiguration();

        // Assert
        expect(config.title.text).toBe('Line Chart: new title');
    });

    it('setData_titleIsGiven_setWithNewTitle', function() {
        // Arrange
        initialize();
        var bar = new LineChart('Initialize title');
        var publicationMockData = [
            {year: '2017', count: '250', mostCited: {title: 'title#001'}},
            {year: '2018', count: '251', mostCited: {title: 'title#002'}},
            {year: '', count: '252', mostCited: {title: 'title#003'}},
            {year: '2020', count: '253', mostCited: {title: 'title#004'}},
        ];

        // Act
        bar.setData(publicationMockData);
        var config = bar.getConfiguration();

        // Assert
        expect(config.title.text).toBe('Line Chart: Initialize title');
        expect(config.xAxis.categories).toEqual(jasmine.any(Array));
        expect(config.xAxis.categories.length).toEqual(3);
        expect(config.xAxis.categories[0]).toEqual(jasmine.any(Number));
        expect(config.series).toEqual(jasmine.any(Array));
        expect(config.series[0].data).toEqual(jasmine.any(Array));
        expect(config.series[0].data.length).toEqual(3);
    });
});
