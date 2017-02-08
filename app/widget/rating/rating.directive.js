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
