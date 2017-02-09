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
