'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:ImagesCheck
 * @description
 * # ImagesCheck
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('imageCheckCtrl', ['$scope', 'LoadMedsSrv', function($scope, LoadMedsSrv) {
        // Llamada http get mediante servicio LoadMedsSrv
        var medicamentos = LoadMedsSrv.httpReq('MATERIAL DE CURACION');
        // Una vez obtenida las respuesta del http get se manejan los datos
        medicamentos.then(function(datos) {
            
            $scope.imgs = JSON.parse(datos.data.d);
            console.log($scope.imgs);

        }, function(e) {
            for (var key in e) {
                console.log(key + ' ', e[key]);
            }
        });
    }]);