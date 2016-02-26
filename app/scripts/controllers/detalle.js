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

        var idProductoParam = $stateParams.idProducto.trim();

        var productoInMemory = _.isEmpty($rootScope.productoAct);

        $scope.getPromo = function(id) {
            //console.clear();

            var datos = LoadPromoSrv.httpReq(id);

            datos.then(function(info) {
                var promoCombo = PromoOrComboSrv.getPromoCombo(info);
                if (promoCombo) {
                    $rootScope.ofertas = promoCombo.ofertas;
                }

            }, function(e) {
                for (var key in e) {
                    $log.error(key + ' ', e[key]);
                }
            });

        };        

        function preparaEntorno() {
            for (var key in $scope.medActual) {
                console.info(key + ' ', $scope.medActual[key]);
            }
            $stateParams.medicamentoId = $scope.medActual.NombreProducto;

            var productoConOferta = _.isEmpty($scope.medActual.Oferta);
            if (!productoConOferta) {

                var ofertaTxtF = {
                    "ofertas": []
                }
                $rootScope.tipoDeOferta = $scope.medActual.Oferta[0].TipoOferta;
                for (var i = 0; i < $scope.medActual.Oferta.length; i++) {
                    ofertaTxtF.ofertas.push({
                        id: $scope.medActual.IdProducto.trim(),
                        description: $scope.medActual.Oferta[i].Descripcion,
                        cantidad: $scope.medActual.Oferta[i].Cantidad,
                        precio: $scope.medActual.Oferta[i].PrecioOferta,
                        ahorro: $scope.medActual.Oferta[i].Mensaje
                    });
                }
                $rootScope.ofertas = ofertaTxtF.ofertas;
            } else {
                console.info('No busca promo');
                $rootScope.tipoDeOferta = '';
            }

            if ($scope.medActual.NombreSeccion === 'HIGIENE Y PERFUMERIA' || $scope.medActual.NombreSeccion === 'VITAMINAS Y SUPLEMENTOS') {
                $scope.calificable = 0;
            } else {
                $scope.calificable = -1;
            }
            console.info($scope.medActual.Ingredientes.length);
            for (var i = 0; i < $scope.medActual.Ingredientes.length; i++) {
                for (var key in $scope.medActual.Ingredientes[i]) {
                    console.log("Ingrediente." + key + " = " + $scope.medActual.Ingredientes[i][key] + ' | ' + typeof $scope.medActual.Ingredientes[i][key]);
                }
            };
        };

        if (productoInMemory) {
            var medDetalle = LoadMedByIdSrv.httpReq(idProductoParam);
            medDetalle.then(function(info) {
                $scope.medActual = (JSON.parse(info.data.d))[0];
                productoSrv.addProduct($scope.medActual);
                preparaEntorno();
            }, function(e) {
                for (var key in e) {
                    $log.error(key + ' ', e[key]);
                }
            });
        } else {
            console.info('Esta en memoria');
            $scope.medActual = productoSrv.getProduct();
            preparaEntorno();
        }

        $rootScope.muestraCarrito = true;

        $scope.ocultaCarrito = function() {
            $rootScope.muestraCarrito = false;
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
