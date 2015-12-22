'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.loadPromo
 * @description
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