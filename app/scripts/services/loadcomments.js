'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.LoadCommentsSrv
 * @description
 * # LoadCommentsSrv
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
	.service('LoadCommentsSrv', ['$http', function($http) {
		return {
			httpReq: function(url, inicio, cuantos) {
				return $http.post('http://farmaciasdesimilares.com.mx/WSAjax/MXFSWEBAJAXService.asmx/ComentarioConsulta', "{'urlRelativo':'" + url + "','inicio':'" + inicio + "','cuantos':'" + cuantos + "'}");
			},
			httpLike: function(clave) {
				return $http.post('http://farmaciasdesimilares.com.mx/WSAjax/MXFSWEBAJAXService.asmx/ComentarioLike', "{'clave':'" + clave + "'}");
			},
			httpDislike: function(clave) {
				return $http.post('http://farmaciasdesimilares.com.mx/WSAjax/MXFSWEBAJAXService.asmx/ComentarioDisLike', "{'clave':'" + clave + "'}");
			},
			httpComment: function(nombre, texto, urlRelativo, padre) {
				return $http.post('http://farmaciasdesimilares.com.mx/WSAjax/MXFSWEBAJAXService.asmx/ComentarioInsertar', "{'nombre':'" + nombre + "','texto':'" + texto + "','urlRelativo':'" + urlRelativo + "', 'comentarioPadre':'" + padre + "'}");
			}
		};
	}]);