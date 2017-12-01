describe('ColumnChart.test.js', function() {
    var ColumnChart;

    beforeEach(module('pubHistogram'));
    beforeEach(function() {
        ColumnChart = null;
    });

    function initialize() {
        inject(function($injector) {
            ColumnChart = $injector.get('ColumnChart');
        });
    }

    it('init_noTitleIsGiven', function() {
        // Arrange
        initialize();

        // Act
        var bar = new ColumnChart();
        var config = bar.getConfiguration();

        // Assert
        expect(config.title.text).toBe('Column Chart: ');
    });

    it('init_titleIsGiven', function() {
        // Arrange
        initialize();

        // Act
        var bar = new ColumnChart('Initialize title');
        var config = bar.getConfiguration();

        // Assert
        expect(config.title.text).toBe('Column Chart: Initialize title');
    });

    it('setTitle_titleIsGiven_setWithNewTitle', function() {
        // Arrange
        initialize();
        var bar = new ColumnChart('Initialize title');

        // Act
        bar.setTitle('new title');
        var config = bar.getConfiguration();

        // Assert
        expect(config.title.text).toBe('Column Chart: new title');
    });

    it('setData_titleIsGiven_setWithNewTitle', function() {
        // Arrange
        initialize();
        var bar = new ColumnChart('Initialize title');
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
        expect(config.title.text).toBe('Column Chart: Initialize title');
        expect(config.xAxis.categories).toEqual(jasmine.any(Array));
        expect(config.xAxis.categories.length).toEqual(3);
        expect(config.xAxis.categories[0]).toEqual(jasmine.any(Number));
        expect(config.series).toEqual(jasmine.any(Array));
        expect(config.series[0].data).toEqual(jasmine.any(Array));
        expect(config.series[0].data.length).toEqual(3);
    });
});
