'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.LoadHigieneSrv
 * @description
 * # LoadHigieneSrv
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
  .service('LoadHigieneSrv', ['$http', function ($http) {
    return {
      httpReq: function(cuantos, pagina) {
      	return $http.post('https://farmaciasdesimilares.com/WSAjaxHttps/MXFSWEBAJAXService.asmx/ObtenerProductos', "{'cuantos':'" + cuantos + "','paginador':'" + pagina + "','familia':'higiene'}");
      }
    };
  }]);
