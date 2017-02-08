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
