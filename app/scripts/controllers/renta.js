'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:RentaCtrl
 * @description
 * # RentaCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('RentaCtrl', ['ContactSrv', '$scope', '$log', 'jQuery', 'banner', function(ContactSrv, $scope, $log, $, banner) {
        $scope.enviado = 0;
        // Usa servicio 'ContactSrv.postRentaInfo' para mandar información de renta de local
        $scope.postRentaInfo = function() {

            console.clear();

            var forma = {
                'Nombre'       : $scope.username,
                'Email'        : $scope.email,
                'TelefonoFijo' : $scope.tel,
                'TelefonoMovil': $scope.telMov,
                'Direccion'    : $scope.direccion,
                'Localidad'    : $scope.localidad,
                'NumExt'       : $scope.numExt,
                'NumInt'       : $scope.numInt,
                'Colonia'      : $scope.colonia,
                'Municipio'    : $scope.municipio,
                'MetrosFrente' : $scope.metrosFrente,
                'MetrosFondo'  : $scope.metrosFondo,
                'ImporteRenta' : $scope.importeRenta,
                'Notas'        : $scope.notas
            };

            $log.info(forma);

            //var datos = ContactSrv.postRentaInfo($scope.username, $scope.email, $scope.asunto, 'Farmacias MX', $scope.mensaje, $scope.estado, $scope.tel);

            /*datos.then(function(info) {
                $log.info(info);

            }, function(e) {
                $log.error(e);
            });*/


            $scope.username     = '';
            $scope.email        = '';
            $scope.tel          = '';
            $scope.telMov       = '';
            $scope.direccion    = '';
            $scope.localidad    = '';
            $scope.numExt       = '';
            $scope.numInt       = '';
            $scope.colonia      = '';
            $scope.municipio    = '';
            $scope.metrosFrente = '';
            $scope.metrosFondo  = '';
            $scope.importeRenta = '';
            $scope.notas        = '';
            $scope.rentaForm.$setUntouched();

            $scope.enviado = 1;
            $scope.scrollToTop();

        };

        $scope.scrollToTop = function() {
            $('html, body').animate({
                scrollTop: $("html").offset().top
            }, 1000);
        };

        banner.random();
    }]);
