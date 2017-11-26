describe('dateUtil.test.js', function() {
    var dateUtil;

    beforeEach(module('pubHistogram'));
    afterEach(function() {
        dateUtil = null;
    });

    function initialize() {
        inject(function($injector) {
            dateUtil = $injector.get('dateUtil');
        });
    }

    it('dateToString_validDate_returnDateStringFormat', function() {
        // Arrange
        initialize();
        var date = new Date(2017, 0, 1);

        // Act
        var d = dateUtil.dateToString(date);

        // Assert
        expect(d).toBe('2017-01-01');
    });

    it('dateToString_invalidDate_returnDateStringFormat', function() {
        // Arrange
        initialize();
        var date = 'not a date';

        // Act
        var d = dateUtil.dateToString(date);

        // Assert
        expect(d).toBe('');
    });

    it('separateYears_invalidDate_returnEmptyArray', function() {
        // Arrange
        initialize();
        var date = new Date(2017, 0, 1);
        var invalidDate = 'not a date';

        // Act
        var d = dateUtil.separateYears(date, invalidDate);

        // Assert
        expect(d).toEqual(jasmine.any(Array));
        expect(d.length).toBe(0);
    });

    it('separateYears_validDate_returnArrayOfDates', function() {
        // Arrange
        initialize();
        var startdate = new Date(2016, 0, 1);
        var enddate = new Date(2017, 11, 31);

        // Act
        var d = dateUtil.separateYears(startdate, enddate);

        // Assert
        expect(d).toEqual(jasmine.any(Array));
        expect(d.length).toBe(2);
        expect(d[0].dateStart).toBe('2016-01-01');
        expect(d[0].dateEnd).toBe('2016-12-31');
        expect(d[1].dateStart).toBe('2017-01-01');
        expect(d[1].dateEnd).toBe('2017-12-31');
    });

    it('separateYears_validDate_returnArrayOfDates', function() {
        // Arrange
        initialize();
        var startdate = new Date(2016, 0, 1);
        var enddate = new Date(2016, 10, 31);

        // Act
        var d = dateUtil.separateYears(startdate, enddate);

        // Assert
        expect(d).toEqual(jasmine.any(Array));
        expect(d.length).toBe(1);
        expect(d[0].dateStart).toBe('2016-01-01');
        expect(d[0].dateEnd).toBe('2016-12-31');
    });
});
