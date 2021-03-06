'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.busqueda
 * @description: Servicio para búsqueda predictiva
 * # busqueda
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
    .service('busqueda', ['$http', function($http) {
        return {
            buscaPredictiva: function(texto) {
                return $http.post('https://farmaciasdesimilares.com/WSAjaxHttps/MXFSWEBAJAXService.asmx/BuscarPredictivo', "{'texto':'" + texto + "'}");
            }
        };
    }]);
