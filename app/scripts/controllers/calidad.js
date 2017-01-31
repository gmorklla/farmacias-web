'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:BarraControl
 * @description
 * # BarraControl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('CalidadCtrl', ['banner', '$state', '$scope', function(banner, $state, $scope) {
        banner.random();

        if ($state.$current.name == 'facturacion') {
            $scope.mantenimiento = false;
            var dateObj = new Date();
            var dia = dateObj.getDate();
            var hora = dateObj.getHours();
            var minutos = dateObj.getMinutes();
            if (dia == 6) {
                if (hora >= 0 && hora <= 6 && minutos <= 15) {
                    $scope.mantenimiento = true;
                    $('#mantenimiento').modal();
                }
            }
        }
    }]);
