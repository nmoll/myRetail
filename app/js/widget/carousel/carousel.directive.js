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
