describe('BarChart.test.js', function() {
    var BarChart;

    beforeEach(module('pubHistogram'));
    beforeEach(function() {
        BarChart = null;
    });

    function initialize() {
        inject(function($injector) {
            BarChart = $injector.get('BarChart');
        });
    }

    it('init_noTitleIsGiven', function() {
        // Arrange
        initialize();

        // Act
        var bar = new BarChart();
        var config = bar.getConfiguration();

        // Assert
        expect(config.title.text).toBe('Bar Chart: ');
    });

    it('init_titleIsGiven', function() {
        // Arrange
        initialize();

        // Act
        var bar = new BarChart('Initialize title');
        var config = bar.getConfiguration();

        // Assert
        expect(config.title.text).toBe('Bar Chart: Initialize title');
    });

    it('setTitle_titleIsGiven_setWithNewTitle', function() {
        // Arrange
        initialize();
        var bar = new BarChart('Initialize title');

        // Act
        bar.setTitle('new title');
        var config = bar.getConfiguration();

        // Assert
        expect(config.title.text).toBe('Bar Chart: new title');
    });

    it('setData_titleIsGiven_setWithNewTitle', function() {
        // Arrange
        initialize();
        var bar = new BarChart('Initialize title');
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
        expect(config.title.text).toBe('Bar Chart: Initialize title');
        expect(config.xAxis.categories).toEqual(jasmine.any(Array));
        expect(config.xAxis.categories.length).toEqual(3);
        expect(config.xAxis.categories[0]).toEqual(jasmine.any(Number));
        expect(config.series).toEqual(jasmine.any(Array));
        expect(config.series[0].data).toEqual(jasmine.any(Array));
        expect(config.series[0].data.length).toEqual(3);
    });
});
