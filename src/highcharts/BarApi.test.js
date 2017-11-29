describe('BarApi.test.js', function() {
    var BarApi;

    beforeEach(module('pubHistogram'));
    beforeEach(function() {
        BarApi = null;
    });

    function initialize() {
        inject(function($injector) {
            BarApi = $injector.get('BarApi');
        });
    }

    it('setup', function() {
        // Arrange
        initialize();

        // Act
        var bar = new BarApi();
        bar.setTitle('new title');

        // Assert
        expect(bar.configuration.title.text).toBe('new title');
    });
});
