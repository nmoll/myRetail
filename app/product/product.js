(function () {
'use strict';

function config ($stateProvider) {

    var productState = {
        controller: 'ProductCtrl as productCtrl',
        url: '/product',
        templateUrl: 'product/product.html',
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
