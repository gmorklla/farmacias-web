'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.loadData
 * @description: request get genérico
 * # loadData
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
  .service('loadData', ['$http', function ($http) {

    return {
      httpReq: function(url) {
         return $http.get(url);
      }
    };

  }]);
