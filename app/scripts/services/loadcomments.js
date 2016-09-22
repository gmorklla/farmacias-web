'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.LoadCommentsSrv
 * @description: servicio para manenar los comentarios. | httpReq muestra los comentarios; httpLike sirve para dar like a un comentario; httpDislike califica negativamente un comentario y httpComment deja una respuesta a un comentario ya existente
 * # LoadCommentsSrv
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
	.service('LoadCommentsSrv', ['$http', function($http) {
		return {
			httpReq: function(url, inicio, cuantos) {
				return $http.post('https://farmaciasdesimilares.com/WSAjaxHttps/MXFSWEBAJAXService.asmx/ComentarioConsulta', "{'urlRelativo':'" + url + "','inicio':'" + inicio + "','cuantos':'" + cuantos + "'}");
			},
			httpLike: function(clave) {
				return $http.post('https://farmaciasdesimilares.com/WSAjaxHttps/MXFSWEBAJAXService.asmx/ComentarioLike', "{'clave':'" + clave + "'}");
			},
			httpDislike: function(clave) {
				return $http.post('https://farmaciasdesimilares.com/WSAjaxHttps/MXFSWEBAJAXService.asmx/ComentarioDisLike', "{'clave':'" + clave + "'}");
			},
			httpComment: function(nombre, texto, urlRelativo, padre) {
				return $http.post('https://farmaciasdesimilares.com/WSAjaxHttps/MXFSWEBAJAXService.asmx/ComentarioInsertar', "{'nombre':'" + nombre + "','texto':'" + texto + "','urlRelativo':'" + urlRelativo + "', 'comentarioPadre':'" + padre + "'}");
			}
		};
	}]);