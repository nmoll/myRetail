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
