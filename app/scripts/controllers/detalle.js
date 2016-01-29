'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:DetalleCtrl
 * @description
 * # DetalleCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('DetalleCtrl', ['loadData', '_', 'prettyUrlSpc', 'productoSrv', 'CarritoSrv', 'LoadMedByIdSrv', 'LoadPromoSrv', 'PromoOrComboSrv', 'Califica', '$state', '$stateParams', '$scope', '$rootScope', '$log', '$location', function(loadData, _, prettyUrlSpc, productoSrv, CarritoSrv, LoadMedByIdSrv, LoadPromoSrv, PromoOrComboSrv, Califica, $state, $stateParams, $scope, $rootScope, $log, $location) {

        $scope.transUrl = function(args) {
            return prettyUrlSpc.prettyUrl(args);
        };

        $rootScope.tipoDeOferta = '';
        $rootScope.ofertas = [];

        $scope.urlShare = $location.absUrl();

        $log.info($stateParams.idProducto);

        var idProductoParam = $stateParams.idProducto.trim();

        var medDetalle = LoadMedByIdSrv.httpReq(idProductoParam);
        medDetalle.then(function(info) {
            $scope.medActual = JSON.parse(info.data.d)[0];
            $stateParams.medicamentoId = $scope.medActual.SUSTANCIA;
            $scope.getPromo($scope.medActual.ID);
            if ($scope.medActual.FAMILIA === 'PERFUMERIA' || $scope.medActual.FAMILIA === 'SUPLEMENTOS') {
                $scope.calificable = 0;
            } else {
                $scope.calificable = -1;
            }
            $log.info($scope.medActual);
            /*      for (var prop in $scope.medActual) {
                    console.log("Med." + prop + " = " + $scope.medActual[prop] + ' | ' + typeof $scope.medActual[prop]);
                  }*/
        }, function(e) {
            $log.error(e);
        });

        $rootScope.muestraCarrito = true;

        $scope.ocultaCarrito = function() {
            $rootScope.muestraCarrito = false;
        };

        $scope.getPromo = function(id) {
            //console.clear();

            var datos = LoadPromoSrv.httpReq(id);

            datos.then(function(info) {
                var promoCombo = PromoOrComboSrv.getPromoCombo(info);
                if (promoCombo) {
                    $rootScope.ofertas = promoCombo.ofertas;
                }

            }, function(e) {
                $log.error(e);
            });

        };

        $scope.calificaText = '';
        $scope.enviado = 0;

        $scope.califica = function() {
            var calificacionAct = $('.glyphicon-star').length - 1;
            console.log(calificacionAct);
            console.log($scope.calificaText);
            console.log(idProductoParam);

            var calificacion = Califica.postCalificacion(idProductoParam, calificacionAct, $scope.calificaText);

            //$('#estrellas').modal('hide');
            $scope.calificaForm.$setUntouched();
            $scope.enviado = 1;

            calificacion.then(function(datos) {
                var yaCalificado = JSON.parse(datos.data.d);
                $log.info('Calificado!');
                console.log(yaCalificado);
            }, function(e) {
                $log.info('Error!');
                console.log(e);
            });

        };

        //console.clear();

        switch ($state.$current.name) {
            case 'medicamentos.detalle':
                $scope.shareCaption = 'Medicamentos';
                break;
            case 'vitaminas.detalle':
                $scope.shareCaption = 'Vitaminas';
                break;
            case 'higiene.detalle':
                $scope.shareCaption = 'Higiene y Perfumería';
                break;
            case 'curacion.detalle':
                $scope.shareCaption = 'Material de curación';
                break;
        }

    }]);
