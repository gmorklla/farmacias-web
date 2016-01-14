'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.Califica
 * @description
 * # Califica
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
	.service('Califica', ['$http', function($http) {
		return {
			postCalificacion: function(calificaId, votacion, calificaComentario) {
				return $http.post('http://farmaciasdesimilares.com.mx/WSAjax/MXFSWEBAJAXService.asmx/CalificacionComentarioPorId', "{'id':'" + calificaId + "','votacion':'" + votacion + "','comentario':'" + calificaComentario + "'}");
			}
		};
	}]);