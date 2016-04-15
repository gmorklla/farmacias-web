'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.loadPromo
 * @description: request post para obtener datos de un producto mediante su id
 * # loadPromo
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
	.service('LoadMedByIdSrv', ['$http', function($http) {
		return {
			httpReq: function(id) {
				return $http.post('http://farmaciasdesimilares.com.mx/WSAjax/MXFSWEBAJAXService.asmx/ObtenerProductosPorID', "{'id':'" + id + "'}");
			}
		};
	}]);