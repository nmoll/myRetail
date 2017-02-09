describe('product', function() {

    beforeEach(function () {
        browser.get('http://localhost:8000/#/product');
    });

    it('should have title correctly set', function() {
        var title = element(by.id('product-title'));
        expect(greeting.getText()).toEqual('Ninja™ Professional Blender with Single Serve Blending Cups');
    });

    it('should have price correctly set', function () {});

    describe('carousel', function () {

        it('should display image if selected', function () {});

        it('should display next image when carousel is moved to the right', function () {});

        it('should display next image when carousel is moved to the right', function () {});

        it('should have no back arrow if at first image', function () {});

        it('should have no next arrow if at last image', function () {});

    });

});
