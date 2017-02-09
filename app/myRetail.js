(function () {
'use strict';

function config ($urlRouterProvider) {

    $urlRouterProvider.otherwise('/product');

}

angular.module('myRetail', [
    'ui.router',
    'myRetail.product',
    'ngSanitize'
])
.config(['$urlRouterProvider', config]);

})();

(function () {
'use strict';

var template =
'<div>' +
    '<strong class="pull-right">' +
        'view all {{ productReviewCtrl.review.totalReviews }} reviews' +
    '</strong>' +
    '<rating value="productReviewCtrl.review.consolidatedOverallRating"></rating> <strong>overall</strong>' +
    '<div class="well">' +
        '<div class="row">' +
            '<div class="col-xs-6">' +
                '<strong>PRO</strong>' +
                '<div><small class="text-muted">Most helpful 4-5 star review</small></div>' +
            '</div>' +
            '<div class="col-xs-6">' +
                '<strong>CON</strong>' +
                '<div><small class="text-muted">Most helpful 1-2 star review</small></div>' +
            '</div>' +
        '</div>' +
        '<hr>' +
        '<div class="row">' +
            '<div class="col-xs-6">' +
                '<rating value="productReviewCtrl.review.Pro[0].overallRating"></rating>' +
                '<div><strong>{{ productReviewCtrl.review.Pro[0].title }}</strong></div>' +
                '<p>{{ productReviewCtrl.review.Pro[0].review }}</p>' +
            '</div>' +
            '<div class="col-xs-6">' +
                '<rating value="productReviewCtrl.review.Con[0].overallRating"></rating>' +
                '<div><strong>{{ productReviewCtrl.review.Con[0].title }}</strong></div>' +
                '<p>{{ productReviewCtrl.review.Con[0].review }}</p>' +
            '</div>' +
        '</div>' +
    '</div>'
'</div>';

function ProductReview () {
    return {
        restrict: 'E',
        template: template,
        scope: {
            review: '='
        },
        bindToController: true,
        controllerAs: 'productReviewCtrl',
        controller: [function () {}]
    }
}

angular.module('myRetail.product')
    .directive('productReview', [ProductReview]);

})();

(function () {
'use strict';

function ProductCtrl (product) {

    var ctrl = this;
    ctrl.isAvailableOnline = isAvailableOnline;
    ctrl.isAvailableInStore = isAvailableInStore;

    ctrl.product = product;

    ctrl.images = getImages();
    ctrl.primaryImage = ctrl.product.Images[0].PrimaryImage[0].image;

    function isAvailableOnline () {
        return product.purchasingChannelCode === '0' || product.purchasingChannelCode === '1';
    }

    function isAvailableInStore () {
        return product.purchasingChannelCode === '0' || product.purchasingChannelCode === '2';
    }

    function getImages () {
        var result = [];
        result.push(ctrl.product.Images[0].PrimaryImage[0].image);
        angular.forEach(ctrl.product.Images[0].AlternateImages, function (alternateImage) {
            result.push(alternateImage.image);
        });
        return result;
    }

}

angular.module('myRetail.product')
    .controller('ProductCtrl', ['product', ProductCtrl]);

})();

(function () {
'use strict';

function config ($stateProvider) {

    var productState = {
        controller: 'ProductCtrl as productCtrl',
        url: '/product',
        templateUrl: 'js/product/product.html',
        resolve: {
            product: ['ProductService', function (ProductService) {
                return ProductService.get();
            }]
        }
    }

    $stateProvider.state('productState', productState);

}

angular.module('myRetail.product', [
    'ui.router',
    'myRetail.widgets'
])
.config(['$stateProvider', config]);

})();

(function () {
'use strict';

function ProductService ($http) {

    this.get = function () {
        return $http.get('js/product/item-data.json').then(getResponseData);
    }

    function getResponseData (response) {
        return response.data.CatalogEntryView[0];
    }

}

angular.module('myRetail.product')
    .service('ProductService', ['$http', ProductService]);

})();

(function () {
'use strict';

function Carousel () {
    return {
        restrict: 'E',
        templateUrl: 'js/widget/carousel/carousel.html',
        bindToController: true,
        controllerAs: 'carousel',
        controller: [CarouselCtrl],
        scope: {
            images: '=',
            primary: '='
        }
    }
}

function CarouselCtrl () {

    var ctrl = this;
    ctrl.setPrimary = setPrimary;
    ctrl.goToNext = goToNext;
    ctrl.goToPrevious = goToPrevious;
    ctrl.isStart = isStart;
    ctrl.isEnd = isEnd;

    ctrl.visibleImages = getVisibleImages();

    function setPrimary (image) {
        ctrl.primary = image;
        ctrl.visibleImages = getVisibleImages();
    }

    function getVisibleImages () {
        var currentPosition = getCurrentPosition();
        var offset = isStart() ? 1 : ( isEnd() ? -1 : 0 );

        var position1 = currentPosition -1 + offset;
        var position2 = currentPosition + offset;
        var position3 = currentPosition + 1 + offset;

        return [ctrl.images[position1], ctrl.images[position2], ctrl.images[position3]];
    }

    function goToNext () {
        if (!isEnd()) {
            ctrl.setPrimary(getNextImage());
        }
    }

    function getNextImage () {
        return ctrl.images[getCurrentPosition() + 1];
    }

    function goToPrevious () {
        if (!isStart()) {
            ctrl.setPrimary(getPreviousImage());
        }
    }

    function getPreviousImage () {
        return ctrl.images[getCurrentPosition() - 1];
    }

    function isStart () {
        return getCurrentPosition() === 0;
    }

    function isEnd () {
        return getCurrentPosition() === ctrl.images.length - 1;
    }

    function getCurrentPosition () {
        return ctrl.images.indexOf(ctrl.primary);
    }

}

angular.module('myRetail.widgets', [])
    .directive('carousel', [Carousel]);


})();

(function () {
'use strict';

var template =
'<span>' +
    '<span class="rating-star" ng-repeat="star in rating.stars" ng-class="{ selected: star.num <= rating.value }">\u2605</span>' +
'</span>'

function Rating () {
    return {
        restrict: 'E',
        template: template,
        scope: {
            value: '='
        },
        bindToController: true,
        controllerAs: 'rating',
        controller: [function () {

            var ctrl = this;

            ctrl.stars = [
                { num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }, { num: 5 }
            ]

        }]
    }
}

angular.module('myRetail')
    .directive('rating', [Rating]);

})();
