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
      	return $http.post('http://farmaciasdesimilares.com.mx/WSAjax/MXFSWEBAJAXService.asmx/ObtenerProductos', "{'cuantos':'" + cuantos + "','paginador':'" + pagina + "','familia':'vitaminas'}");
      }
    };
  }]);
