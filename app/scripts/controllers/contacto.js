'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('ContactCtrl', ['ContactSrv', '$scope', '$log', function(ContactSrv, $scope, $log) {

        $scope.enviado = 0;

        $scope.postContactInfo = function() {

            console.clear();

            var forma = {
                'Usuario': $scope.username,
                'Email': $scope.email,
                'Asunto': $scope.asunto,
                'Mensaje': $scope.mensaje,
                'Estado': $scope.estado,
                'Telefono': $scope.tel
            };

            $log.info(forma);

            var datos = ContactSrv.postContactInfo($scope.username, $scope.email, $scope.asunto, 'Farmacias MX', $scope.mensaje, $scope.estado, $scope.tel);

            datos.then(function(info) {
                $log.info(info);

            }, function(e) {
                $log.error(e);
            });


            $scope.username = '';
            $scope.email = '';
            $scope.asunto = '';
            $scope.mensaje = '';
            $scope.estado = '';
            $scope.tel = '';
            $scope.contactForm.$setUntouched();

            $scope.enviado = 1;
            $scope.scrollToTop();

        };

        $scope.scrollToTop = function() {
            $('html, body').animate({
                scrollTop: $("html").offset().top
            }, 1000);
        };


    }]);
