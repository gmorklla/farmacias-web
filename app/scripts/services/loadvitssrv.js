'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.LoadVitsSrv
 * @description
 * # LoadVitsSrv
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
  .service('LoadVitsSrv', ['$rootScope', '$http', function ($rootScope, $http) {
    return {
      httpReq: function(cuantos, pagina) {
      	return $http.post('https://farmaciasdesimilares.com/WSAjaxHttps/MXFSWEBAJAXService.asmx/ObtenerProductos', "{'familia':'VITAMINAS Y SUPLEMENTOS'}");
      }
    };
  }]);
