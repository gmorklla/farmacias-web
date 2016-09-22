'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.loadLocations
 * @description: busca unidades por tipo o por id
 * # loadLocations
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
    .service('loadLocations', ['$http', function($http) {
        return {
            locations: function(type) {
                return $http.post('https://farmaciasdesimilares.com/WSAjaxHttps/MXFSWEBAJAXService.asmx/Localizacion', "{'tipo':'" + type + "'}");
            },
            idLocation: function(idunidad) {
                return $http.post('https://farmaciasdesimilares.com/WSAjaxHttps/MXFSWEBAJAXService.asmx/LocalizacionDetalle', "{'idunidad':'" + idunidad + "'}");
            }            
        };
    }]);
