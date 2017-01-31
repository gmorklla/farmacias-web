'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.loadPromo
 * @description: request post para obtener datos de un producto mediante su id
 * # loadPromo
 * Service in the farmaciasWebApp.
 * http://simimx-webapp/FS.RentanosTuLocalServicioWeb/Servicio/WebService.asmx/ <--- Servicio de pruebas
 */
angular.module('farmaciasWebApp')
	.service('RentaSrv', ['$http', function($http) {
		return {
			municipios: function(id) {
				return $http.post('https://www.farmaciasdesimilares.com/RentanosTuLocalWebService/Servicio/WebService.asmx/ObtenerMunicipios', "{'estado':'" + id + "'}");
			},
			cp: function(estado, municipio) {
				return $http.post('https://www.farmaciasdesimilares.com/RentanosTuLocalWebService/Servicio/WebService.asmx/ObtenerCodigosPostales', "{'estado':'" + estado + "', 'municipio':'" + municipio + "'}");
			},
			colonia: function(estado, municipio, cp) {
				return $http.post('https://www.farmaciasdesimilares.com/RentanosTuLocalWebService/Servicio/WebService.asmx/ObtenerColonias', "{'estado':'" + estado + "', 'municipio':'" + municipio + "', 'codigoPostal':'" + cp + "'}");
			},
			verificaEmail: function(email) {
				return $http.post('https://www.farmaciasdesimilares.com/RentanosTuLocalWebService/Servicio/WebService.asmx/VerificarCorreoElectronico', "{'correo':'" + email + "'}");
			},
			guardarDatos: function(data) {
				return $http.post('https://www.farmaciasdesimilares.com/RentanosTuLocalWebService/Servicio/WebService.asmx/GuardarDatosPersonalesLocal', "{'correo':'" + data.correo + "', 'nombre':'" + data.nombre + "', 'telefonoF':'" + data.telefonoF + "', 'telefonoM':'" + data.telefonoM + "', 'direccion':'" + data.direccion + "', 'estadoP':'" + data.estadoP + "', 'delegacionMunicipioP':'" + data.delegacionMunicipioP + "', 'calle':'" + data.calle + "', 'numeroE':'" + data.numeroE + "', 'numeroI':'" + data.numeroI + "', 'calle1':'" + data.calle1 + "', 'calle2':'" + data.calle2 + "', 'estadoL':'" + data.estadoL + "', 'delegacionMunicipioL':'" + data.delegacionMunicipioL + "', 'codigoPostal':'" + data.codigoPostal + "', 'colonia':'" + data.colonia + "', 'metrosFrente':'" + data.metrosFrente + "', 'metrosFondo':'" + data.metrosFondo + "', 'supTotal':'" + data.supTotal + "', 'importeRenta':'" + data.importeRenta + "', 'notas':'" + data.notas + "'}");
			}	
		};
	}]);