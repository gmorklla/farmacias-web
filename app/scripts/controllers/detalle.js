'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:DetalleCtrl
 * @description
 * # DetalleCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('DetalleCtrl', ['loadData', '_', 'prettyUrlSpc', 'productoSrv', 'CarritoSrv', 'LoadMedByIdSrv', 'LoadPromoSrv', 'PromoOrComboSrv', 'Califica', 'loadLocations', 'banner', 'jQuery', '$state', '$stateParams', '$scope', '$rootScope', '$log', '$location', function(loadData, _, prettyUrlSpc, productoSrv, CarritoSrv, LoadMedByIdSrv, LoadPromoSrv, PromoOrComboSrv, Califica, loadLocations, banner, jQuery, $state, $stateParams, $scope, $rootScope, $log, $location) {
        
        $rootScope.general = false;
        // Usa servicio 'prettyUrlSpc' para dar formato a un texto, adecuado para su uso en un url 
        $scope.transUrl = function(args) {
            return prettyUrlSpc.prettyUrl(args);
        };

        $rootScope.tipoDeOferta = '';
        $rootScope.ofertas = [];

        $scope.urlShare = $location.absUrl();

        var idProductoParam = $stateParams.idProducto.trim();

        // Define la familia a la que pertenecen los productos de acuerdo al estado en el que nos encontramos
        $scope.familia = $state.$current.parent.toString();      

        var productoInMemory = _.isEmpty($rootScope.productoAct);
        // Usa servicio 'LoadPromoSrv.httpReq' para buscar promociones del producto mostrado
        $scope.getPromo = function(id) {
            //console.clear();

            var datos = LoadPromoSrv.httpReq(id);

            datos.then(function(info) {
                var promoCombo = PromoOrComboSrv.getPromoCombo(info);
                //console.info(promoCombo);
                if (promoCombo) {
                    $rootScope.ofertas = promoCombo.ofertas;
                    //console.info($rootScope.ofertas);
                }

            }, function(e) {
                for (var key in e) {
                    $log.error(key + ' ', e[key]);
                }
            });

        };
        // Con el medicamento, checa si tiene o no promo, si es o no regional, si es de sección higiene o vitaminas, y dependiendo de eso muestra información correspondiente
        function preparaEntorno() {
            /*for (var key in $scope.medActual) {
                console.info(key + ' ', $scope.medActual[key]);
            } */          
            $stateParams.medicamentoId = $scope.medActual.NombreProducto;

            var productoConOferta = _.isEmpty($scope.medActual.Oferta);
            if (!productoConOferta) {
                buscaPromo();
            } else {
                //console.info('No busca promo');
                $rootScope.tipoDeOferta = '';
            }

            var productoRegional = _.isEmpty($scope.medActual.ProductoUnidadRegionalizada);
            if (!productoRegional) {
                buscaUnidades();
            }

            if ($scope.medActual.NombreSeccion === 'HIGIENE Y PERFUMERIA' || $scope.medActual.NombreSeccion === 'VITAMINAS Y SUPLEMENTOS') {
                $scope.calificable = 0;
            } else {
                $scope.calificable = -1;
            }
            /*console.info($scope.medActual.Ingredientes.length);
            for (var i = 0; i < $scope.medActual.Ingredientes.length; i++) {
                for (var key in $scope.medActual.Ingredientes[i]) {
                    console.log("Ingrediente." + key + " = " + $scope.medActual.Ingredientes[i][key] + ' | ' + typeof $scope.medActual.Ingredientes[i][key]);
                }
            };*/
        }

        // Función que usa el servicio 'LoadMedByIdSrv.httpReq' para buscar la información del producto con base en su id
        function getProductById() {
            var medDetalle = LoadMedByIdSrv.httpReq(idProductoParam);
            medDetalle.then(function(info) {
                $scope.medActual = (JSON.parse(info.data.d))[0];
                //console.info($scope.medActual);
                productoSrv.addProduct($scope.medActual);
                preparaEntorno();
            }, function(e) {
                for (var key in e) {
                    $log.error(key + ' ', e[key]);
                }
            });
        }        

        getProductById();

        $rootScope.muestraCarrito = true;

        $scope.ocultaCarrito = function() {
            $rootScope.muestraCarrito = false;
        };

        $scope.calificaText = '';
        $scope.enviado = 0;
        // Si se puede, usa servicio 'Califica.postCalificacion' para calificar producto mostrado
        $scope.califica = function() {
            //console.info(document.getElementsByClassName("glyphicon-star").length - 1);
            var calificacionAct = $('.glyphicon-star').length - 1;
            //console.log(calificacionAct);
            //console.log($scope.calificaText);
            //console.log(idProductoParam);

            var calificacion = Califica.postCalificacion(idProductoParam, calificacionAct, $scope.calificaText);

            //$('#estrellas').modal('hide');
            $scope.calificaForm.$setUntouched();
            $scope.enviado = 1;

            calificacion.then(function(datos) {
                var yaCalificado = JSON.parse(datos.data.d);
                $log.info('Calificado!');
                //console.log(yaCalificado);
            }, function(e) {
                $log.info('Error!');
                console.log(e);
            });

        };

        // Dependiendo del estado, establece información que se usará en el comparte
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
        // Función que se encarga de presentar la información de las promociones que tiene el producto
        function buscaPromo() {
            var ofertaTxtF = {
                "ofertas": []
            };
            //console.info( $scope.medActual);
            for (var i = 0; i < $scope.medActual.Oferta.length; i++) {
                var idDelCombo = $scope.medActual.Oferta[i].idCombo;
                var existeONo = _.findWhere(ofertaTxtF.ofertas, {idCombo: idDelCombo});
                if(!existeONo) {
                    ofertaTxtF.ofertas.push({
                        id: $scope.medActual.Oferta[i].idproducto.trim(),
                        nombre: $scope.medActual.Oferta[i].Nombre,
                        cantidad: $scope.medActual.Oferta[i].Cantidad,
                        precio: $scope.medActual.Oferta[i].PrecioOferta,
                        ahorro: $scope.medActual.Oferta[i].Mensaje,
                        tipo: $scope.medActual.Oferta[i].TipoOferta,
                        idCombo: $scope.medActual.Oferta[i].idCombo
                    });
                } else {
                    _.extend(_.findWhere(ofertaTxtF.ofertas, {idCombo: idDelCombo}),
                        {
                            id2: $scope.medActual.Oferta[i].idproducto.trim(),
                            nombre2: $scope.medActual.Oferta[i].Nombre
                        });
                }
            }
            $rootScope.ofertas = ofertaTxtF.ofertas;
        }
        // Función que se encarga de presentar la información de las unidades en las que se vende el producto
        function buscaUnidades() {
            var unidades = $scope.medActual.ProductoUnidadRegionalizada;
            $scope.opciones = [];
            for (var i = 0; i < unidades.length; i++) {
                $scope.opciones.push(unidades[i]);
            }
            $scope.opciones = _.sortBy($scope.opciones, 'unidad');
            $scope.unidad = $scope.opciones[0];
        }
        // Usa servicio 'loadLocations.idLocation' para localizar la unidad en google maps
        $scope.localizaUnidad = function (unidad) {
            //console.info(unidad);
            var localizaId = loadLocations.idLocation(unidad.idunidad);

            localizaId.then(function(datos) {
                $scope.datosLocaliza = JSON.parse(datos.data.d);
                $state.go('localiza.urlNoLat', { 
                    tipo: 1,
                    calle: $scope.datosLocaliza[0].latitud,
                    colonia: $scope.datosLocaliza[0].longitud,
                    ciudad: unidad.idunidad
                });
            }, function(e) {
                console.error(e);
            });
        };

        banner.random();

        $scope.versionN = '';
        // Si el producto tiene más de un proveedor, con esta función se determina a cual se refiere para usar en el modal
        $scope.version = function (indice) {
            if(indice){
                $scope.versionN = '_' + indice;
            }else{
                $scope.versionN = '';
            }
        };
              

    }]);
