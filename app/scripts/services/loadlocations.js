'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.loadLocations
 * @description
 * # loadLocations
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
    .service('loadLocations', ['$http', function($http) {
        return {
            locations: function(type) {
                return $http.post('http://farmaciasdesimilares.com.mx/WSAjax/MXFSWEBAJAXService.asmx/Localizacion', "{'tipo':'" + type + "'}");
            },
            idLocation: function(idunidad) {
                return $http.post('http://farmaciasdesimilares.com.mx/WSAjax/MXFSWEBAJAXService.asmx/LocalizacionDetalle', "{'idunidad':'" + idunidad + "'}");
            }            
        };
    }]);
