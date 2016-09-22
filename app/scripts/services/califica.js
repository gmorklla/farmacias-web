'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.Califica
 * @description: servicio para calificar productos (vitaminas - higiene)
 * # Califica
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
	.service('Califica', ['$http', function($http) {
		return {
			postCalificacion: function(calificaId, votacion, calificaComentario) {
				return $http.post('https://farmaciasdesimilares.com/WSAjaxHttps/MXFSWEBAJAXService.asmx/CalificacionComentarioPorId', "{'id':'" + calificaId + "','votacion':'" + votacion + "','comentario':'" + calificaComentario + "'}");
			}
		};
	}]);