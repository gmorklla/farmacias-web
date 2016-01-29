'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.busqueda
 * @description
 * # busqueda
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
    .service('busqueda', ['$http', function($http) {
        return {
            buscaPredictiva: function(texto, cuantos) {
                return $http.post('http://farmaciasdesimilares.com.mx/WSAjax/MXFSWEBAJAXService.asmx/BuscarPredictivo', "{'texto':'" + texto + "','cuantos':'" + cuantos + "'}");
            }
        };
    }]);
