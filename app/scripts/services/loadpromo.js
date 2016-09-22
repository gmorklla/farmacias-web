'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.loadPromo
 * @description: http request post para obtener productos por id
 * # loadPromo
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
	.service('LoadPromoSrv', ['$http', '$log', function($http, $log) {
		return {
			httpReq: function(id) {
				return $http.post('https://farmaciasdesimilares.com/WSAjaxHttps/MXFSWEBAJAXService.asmx/ObtenerProductosPorID', "{'id':'" + id + "'}");
			}
		};
	}]);