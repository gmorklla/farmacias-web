'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.loadPromo
 * @description: request post para obtener datos de un producto mediante su id
 * # loadPromo
 * Service in the farmaciasWebApp.
 * http://farmaciasdesimilares.com.mx/WSAjaxPrueba/MXFSWEBAJAXService.asmx/ObtenerProductosPorID <--- Servicio de pruebas
 */
angular.module('farmaciasWebApp')
	.service('LoadMedByIdSrv', ['$http', function($http) {
		return {
			httpReq: function(id) {
				return $http.post('https://farmaciasdesimilares.com/WSAjaxHttps/MXFSWEBAJAXService.asmx/ObtenerProductosPorID', "{'id':'" + id + "'}");
			},
			httpReq2: function(id) {
				return $http.post('http://www.farmaciasdesimilares.com.mx/WSAjaxPrueba/MXFSWEBAJAXService.asmx/ObtenerProductosPorID', "{'id':'" + id + "'}");
			}
		};
	}]);