'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.LoadMedsSrv
 * @description
 * # LoadMedsSrv
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
  .service('LoadMedsSrv', ['$http', function ($http) {
    return {
      httpReq: function(tipo) {
		return $http.post('http://farmaciasdesimilares.com.mx/WSAjax/MXFSWEBAJAXService.asmx/ObtenerProductos', "{'familia':'" + tipo + "'}");
      }
    };
  }]);
