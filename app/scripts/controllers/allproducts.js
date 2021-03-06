'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:AllProductsCtrl
 * @description
 * # AllProductsCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('AllProductsCtrl', ['LoadMedsSrv', 'prettyUrlSpc', 'productoSrv', 'CarritoSrv', 'banner', 'deviceDetector', 'LoadMedByIdSrv', '_', '$scope', '$rootScope', '$stateParams', '$log', '$timeout', '$window', '$state', '$filter', function(LoadMedsSrv, prettyUrlSpc, productoSrv, CarritoSrv, banner, deviceDetector, LoadMedByIdSrv, _, $scope, $rootScope, $stateParams, $log, $timeout, $window, $state, $filter) {

        $rootScope.general = true;
        $rootScope.muestraCarrito = true;
        // Usa servicio 'prettyUrlSpc' para dar formato a un texto, adecuado para su uso en un url 
        $scope.transUrl = function(args) {
            return prettyUrlSpc.prettyUrl(args);
        };

        $scope.etiqueta = $stateParams.promo;
        $scope.sortType = 'item.NombreProducto'; // set the default sort type
        $scope.sortReverse = false; // set the default sort order

        // Número de links en paginador de acuerdo a si es mobile o no
        $scope.numeroLinksPaginacion = function () {
            if(deviceDetector.isMobile()){
                return 5;
            } else {
                return 7;
            }
        }

        //console.log(LoadMedsSrv.httpReq());
        $scope.meds = [];
        $scope.cuantos = 9;

        // Función que usa servicio 'LoadMedsSrv.httpReq' para buscar productos de la familia deseada
        $scope.getMeds = function() {
            // Se muestra el loader gif superior 
            $("#loadingMeds, #loadingMeds2, .loadScreen").fadeIn("slow");
            $scope.muestraAlerta = false;

            $('html, body').animate({
                scrollTop: $("html").offset().top
            }, 1000);
            // Llamada http get mediante servicio LoadMedsSrv
            var familias = ['MEDICAMENTOS', 'VITAMINAS Y SUPLEMENTOS', 'HIGIENE Y PERFUMERIA', 'MATERIAL DE CURACION'];
            var medicamentos = LoadMedsSrv.httpReq(familias[0]);
            var contenedor = [];
            // Una vez obtenida las respuesta del http get se manejan los datos
            medicamentos.then(function(datos) {
                // Si no hay indice de paginación, se manda al número 1
                if (!$scope.pagina) {
                    $scope.pagina = 1;
                }
                
                contenedor.push(JSON.parse(datos.data.d));

                // Obtiene Vits
                var vitaminas = LoadMedsSrv.httpReq(familias[1]);
                vitaminas.then(function(datos) {
                    contenedor.push(JSON.parse(datos.data.d));
                    // Obtiene Higiene
                    var higiene = LoadMedsSrv.httpReq(familias[2]);
                    higiene.then(function(datos) {
                        contenedor.push(JSON.parse(datos.data.d));
                        // Obtiene Curación
                        var curacion = LoadMedsSrv.httpReq(familias[3]);
                        curacion.then(function(datos) {
                            contenedor.push(JSON.parse(datos.data.d));
                            $scope.meds = _.union(contenedor[0], contenedor[1], contenedor[2], contenedor[3]);
                            //console.info($scope.meds);
                            // Como ya se obtuvieron los resultados del get se quita el loager gif superior
                            $("#loadingMeds, #loadingMeds2, .loadScreen").fadeOut("slow");                            
                            // Decide si muestra ofertas o combos usando el parámetro 'termino'
                            if($stateParams.termino == 'ofertas') {
                                $scope.filtrarPorOfertas = 'Oferta';
                            } else if ($stateParams.termino == 'combos') {
                                $scope.filtrarPorOfertas = 'Combo';
                            }                            
                        });                        
                    });                    
                });
                $scope.muestraAlerta = true;
            }, function(e) {
                $scope.muestraAlerta = true;
                for (var key in e) {
                    console.log(key + ' ', e[key]);
                }
            });

        };
        // Si regresa de ver el detalle de un producto, guarda el número de página en el que iba el usuario, de otra manera empieza en la primer página
        function decide() {
            if ($rootScope.prevState === 'productosCompletos.detalle') {
                $scope.getMeds();
                $scope.pagina = $rootScope.paginationNumber;
            } else {
                $scope.getMeds();
            }
        };
        // Guarda los datos del producto al que se le hizo click para presentar la información de manera rápida al usuario en la vista de detalle
        $scope.sendProduct = function(pro) {
            $scope.hidePromo();
            $rootScope.general = false;
            if(pro.Oferta.length === 0) {
                productoSrv.addProduct(pro);
            }
        };

        $scope.muestraMas = function() {
            $scope.cuantos = $scope.cuantos + 9;
            $scope.getMeds();
        };

        $scope.ocultaCarrito = function() {
            $('#carritoPreview').fadeOut("slow", function() {
                $rootScope.muestraCarrito = false;
            });
        };
        var timer;
        // Si el producto tiene alguna promoción, esta función se encarga de presentar los datos de dicha promoción
        $scope.getPromo = function(item) {
            if(!deviceDetector.isMobile()){
                var medDetalle = LoadMedByIdSrv.httpReq(item.IdProducto.trim());
                medDetalle.then(function(info) {
                    var datosOfertas = (JSON.parse(info.data.d))[0];

                    $rootScope.tipoDeOferta = item.Oferta[0].TipoOferta;
                    var ofertaTxtF = {
                        "ofertas": []
                    };
                    console.info( datosOfertas );
                    for (var i = 0; i < datosOfertas.Oferta.length; i++) {
                        var idDelCombo = datosOfertas.Oferta[i].idCombo;
                        var existeONo = _.findWhere(ofertaTxtF.ofertas, {idCombo: idDelCombo});
                        if(!existeONo) {
                            ofertaTxtF.ofertas.push({
                                id: datosOfertas.Oferta[i].idproducto.trim(),
                                nombre: datosOfertas.Oferta[i].Nombre,
                                cantidad: datosOfertas.Oferta[i].Cantidad,
                                precio: datosOfertas.Oferta[i].PrecioOferta,
                                ahorro: datosOfertas.Oferta[i].Mensaje,
                                tipo: datosOfertas.Oferta[i].TipoOferta,
                                idCombo: datosOfertas.Oferta[i].idCombo
                            });
                        } else {
                            _.extend(_.findWhere(ofertaTxtF.ofertas, {idCombo: idDelCombo}),
                                {
                                    id2: datosOfertas.Oferta[i].idproducto.trim(),
                                    nombre2: datosOfertas.Oferta[i].Nombre
                                });
                        }
                    }
                    $rootScope.ofertas = ofertaTxtF.ofertas;
                    //console.info($rootScope.ofertas);
                    colocaPromoView();
                    $('.promoView').fadeIn("slow");

                }, function(e) {
                    for (var key in e) {
                        $log.error(key + ' ', e[key]);
                    }
                });
                // -------------------------------------             
            }
        };
        // Función que usa el servicio 'LoadMedByIdSrv.httpReq' para buscar la información del producto con base en su id
        function getProductById(id) {
            var medDetalle = LoadMedByIdSrv.httpReq2(id);
            medDetalle.then(function(info) {
                var dator = (JSON.parse(info.data.d))[0];
                console.info(dator);
            }, function(e) {
                for (var key in e) {
                    $log.error(key + ' ', e[key]);
                }
            });
        }         
        // Oculta la información de la promo con un fadeOut
        $scope.hidePromo = function() {
            $rootScope.viewData = '';
            $('.promoView').fadeOut(0);
        };
        // Función que se encarga de colocar adecuadamente la promoción en la página, calculando propiedades css top y left
        function colocaPromoView(id) {
            var element = document.getElementById('carritoNav'); //replace elementId with your element's Id.
            if (id) {
                element = document.getElementById(id);
            }
            var rect = element.getBoundingClientRect();
            var elementLeft, elementTop; //x and y
            var scrollTop = document.documentElement.scrollTop ?
                document.documentElement.scrollTop : document.body.scrollTop;
            var scrollLeft = document.documentElement.scrollLeft ?
                document.documentElement.scrollLeft : document.body.scrollLeft;
            elementTop = rect.top + scrollTop + 30;
            elementLeft = rect.left + scrollLeft - 261;
            if (id) {
                elementTop = rect.top + scrollTop + 0;
                elementLeft = rect.left + scrollLeft + 15;
            }

            $('.promoView, .preView').css({
                'top': elementTop,
                'left': elementLeft
            });
        };
        // Guarda el número de página (paginación) en el que va el usuario
        $scope.guardaPageNum = function(num) {
            $rootScope.paginationNumber = num;
        };

        $scope.getPreview = function(item) {
            $rootScope.general = false;
            $scope.productoPreview = item;
            var id = 'P_' + item.IdProducto;
            colocaPromoView(id);
            $scope.muestraProducto = true;
            $('.preView').fadeIn("slow");
        };

        $scope.hidePreview = function() {
            $('.preView').fadeOut("slow");
            $scope.muestraProducto = false;
        };
        // Muestra u oculta los filtros para los productos
        $scope.muestraFiltros = function() {
            $scope.filtros = !$scope.filtros;
        };
        // Variable que se usa para mostrar u ocultar los filtros
        $scope.filtros = false;
        // Función que ayuda a mostrar únicamente productos con oferta, combo o a quitar dichos filtros
        $scope.filtraOfertas = function(tipo) {
            switch (tipo) {
                case 1:
                    $scope.filtrarPorOfertas = 'Oferta';
                    break;
                case 2:
                    $scope.filtrarPorOfertas = 'Combo';
                    break;
                default:
                    $scope.filtrarPorOfertas = '';
            }
        };
        // Cierra Modal y resetea campos
        $scope.closeModal = function () {
            $('.modal').modal('hide');
        };

        $( window ).scroll(function() {
            $scope.hidePromo();        
        });               

        decide();

        banner.random();

    }]);
