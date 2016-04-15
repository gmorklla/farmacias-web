'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.ContactSrv
 * @description: servicio para mandar datos de forma de contacto
 * # ContactSrv
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
	.service('ContactSrv', ['$http', function($http) {
		return {
			postContactInfo: function(nombre, mail, asunto, paginaOrigen, comentarios, estado, telefono) {
				return $http.post('http://farmaciasdesimilares.com.mx/WSAjax/MXFSWEBAJAXService.asmx/Contacto', "{'nombre':'" + nombre + "','mail':'" + mail + "','asunto':'" + asunto + "', 'paginaOrigen':'" + paginaOrigen + "','comentarios':'" + comentarios + "','estado':'" + estado + "', 'telefono':'" + telefono + "'}");
			}
		};
	}]);