'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.locationSrv
 * @description
 * # locationSrv
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
    .service('locationSrv',['$rootScope', function($rootScope) {
        $rootScope.locationData = {};

        var addLocationData = function(newObj, tipo) {
            switch(tipo){
                case 1:
                    $rootScope.locationData.farmacias = newObj;
                break;
                case 2:
                    $rootScope.locationData.analisis = newObj;
                break;
                case 3:
                    $rootScope.locationData.consultorios = newObj;
                break;                
                case 4:
                    $rootScope.locationData.dentales = newObj;
                break;
            }
            //console.info($rootScope.locationData);
        };

        var getLocationData = function() {
            return $rootScope.locationData;
        };

        return {
            addLocationData: addLocationData,
            getLocationData: getLocationData
        };
    }]);
