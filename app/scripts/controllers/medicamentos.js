'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:MedicamentosCtrl
 * @description
 * # MedicamentosCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('MedicamentosCtrl', ['LoadMedsSrv', 'prettyUrlSpc', 'productoSrv', 'CarritoSrv', 'banner', 'deviceDetector', 'LoadMedByIdSrv', 'loadData', '$scope', '$rootScope', '$stateParams', '$log', '$timeout', '$window', '$state', '$filter', function(LoadMedsSrv, prettyUrlSpc, productoSrv, CarritoSrv, banner, deviceDetector, LoadMedByIdSrv, loadData, $scope, $rootScope, $stateParams, $log, $timeout, $window, $state, $filter) {

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
        $scope.numeroLinksPaginacion = function() {
                if (deviceDetector.isMobile()) {
                    return 5;
                } else {
                    return 7;
                }
            }
            //console.log(LoadMedsSrv.httpReq());
        $scope.meds = [];
        $scope.cuantos = 9;
        // Define la familia a la que pertenecen los productos de acuerdo al estado en el que nos encontramos
        $scope.familia = $state.$current.name;
        console.log($scope.familia);

        var familia = '';
        //console.log($state.$current.name);
        // Establece datos de acuerdo a la familia
        switch ($state.$current.name) {
            case 'medicamentos':
                familia = 'MEDICAMENTOS'
                $rootScope.familiaId = 'medicamentos.detalle';
                $scope.calificable = 1;
                $scope.notShowPromos = 1;
                break;
            case 'vitaminas':
                familia = 'VITAMINAS Y SUPLEMENTOS'
                $rootScope.familiaId = 'vitaminas.detalle';
                $scope.calificable = 0;
                $scope.notShowPromos = 1;
                break;
            case 'higiene':
                familia = 'HIGIENE Y PERFUMERIA'
                $rootScope.familiaId = 'higiene.detalle';
                $scope.calificable = 0;
                $scope.notShowPromos = 1;
                break;
            case 'curacion':
                familia = 'MATERIAL DE CURACION'
                $rootScope.familiaId = 'curacion.detalle';
                $scope.calificable = 1;
                $scope.notShowPromos = 1;
                break;
            case 'deportistas':
                familia = 'DEPORTISTAS'
                $rootScope.familiaId = 'deportistas.detalle';
                $scope.calificable = 0;
                $scope.notShowPromos = 1;
                break;
            case 'capital-social':
                familia = 'CAPITAL'
                $rootScope.familiaId = 'capital-social.detalle';
                $scope.calificable = 0;
                $scope.notShowPromos = 1;
                break;                
            case 'nuevos':
                familia = 'MEDICAMENTOS'
                $rootScope.familiaId = 'nuevos.detalle';
                $scope.calificable = 1;
                break;
            case 'sitemap':
                familia = 'VITAMINAS Y SUPLEMENTOS'
                $rootScope.familiaId = 'vitaminas.detalle';
                $scope.calificable = 1;
                $scope.notShowPromos = 1;
                break;
        }
        // Función que usa servicio 'LoadMedsSrv.httpReq' para buscar productos de la familia deseada
        $scope.getMeds = function() {
            // Se muestra el loader gif superior 
            $("#loadingMeds, #loadingMeds2, .loadScreen").fadeIn("slow");
            $scope.muestraAlerta = false;

            $('html, body').animate({
                scrollTop: $("html").offset().top
            }, 1000);
            if (familia === 'DEPORTISTAS') {
                //console.log('Deportistas');
                // Usa servicio 'loadData.httpReq' para obtener datos de las notas de manera local si Firebase no carga
                var medicamentos = loadData.httpReq('data/deportistas.json');

                medicamentos.then(function(datos) {
                    // Si no hay indice de paginación, se manda al número 1
                    if (!$scope.pagina) {
                        $scope.pagina = 1;
                    }
                    // Como ya se obtuvieron los resultados del get se quita el loager gif superior
                    $("#loadingMeds, #loadingMeds2, .loadScreen").fadeOut("slow");
                    //$scope.meds = $filter('filter')(JSON.parse(datos.data.d), {$:"https://fsappmovilstorage.blob.core.windows.net/imagenes/"});
                    $scope.meds = datos.data.productos;
                    console.log($scope.meds);
                }, function(e) {
                    console.log(e);
                });
            } else if (familia === 'CAPITAL') {
                //console.log('Deportistas');
                // Usa servicio 'loadData.httpReq' para obtener datos de las notas de manera local si Firebase no carga
                var medicamentos = loadData.httpReq('data/capital-social.json');

                medicamentos.then(function(datos) {
                    // Si no hay indice de paginación, se manda al número 1
                    if (!$scope.pagina) {
                        $scope.pagina = 1;
                    }
                    // Como ya se obtuvieron los resultados del get se quita el loager gif superior
                    $("#loadingMeds, #loadingMeds2, .loadScreen").fadeOut("slow");
                    //$scope.meds = $filter('filter')(JSON.parse(datos.data.d), {$:"https://fsappmovilstorage.blob.core.windows.net/imagenes/"});
                    $scope.meds = datos.data.productos;
                    // console.log($scope.meds);
                }, function(e) {
                    console.log(e);
                });
            } else {
                // Llamada http get mediante servicio LoadMedsSrv
                var medicamentos = LoadMedsSrv.httpReq(familia);
                var sitemap = '';
                // Una vez obtenida las respuesta del http get se manejan los datos
                medicamentos.then(function(datos) {
                    // Si no hay indice de paginación, se manda al número 1
                    if (!$scope.pagina) {
                        $scope.pagina = 1;
                    }
                    // Como ya se obtuvieron los resultados del get se quita el loager gif superior
                    $("#loadingMeds, #loadingMeds2, .loadScreen").fadeOut("slow");
                    //$scope.meds = $filter('filter')(JSON.parse(datos.data.d), {$:"https://fsappmovilstorage.blob.core.windows.net/imagenes/"});
                    $scope.meds = JSON.parse(datos.data.d);
                    //console.log($scope.meds);
                    // Si esta es sección nuevos se aplica un filtro que coloca los productos más recientes
                    if ($scope.familia == 'nuevos') {
                        $scope.meds = $filter('filter')($scope.meds, true);
                    }
                    // Si se quiere hacer sitemap con todas las url que se crean a partir de los medicamentos se usan estas sentencias
                    if ($scope.familia == 'sitemap') {
                        //console.info(typeof $scope.meds);
                        for (var i = $scope.meds.length - 1; i >= 0; i--) {
                            var concatenado = '<url><loc>https://farmaciasdesimilares.com/#/medicamentos/' + $scope.meds[i].IdProducto + '/' + $scope.transUrl($scope.meds[i].NombreProducto) + '</loc></url>';
                            sitemap += concatenado;
                        }
                        $('#jsonHere').html(sitemap.toString());
                    }
                    $scope.muestraAlerta = true;
                }, function(e) {
                    $scope.muestraAlerta = true;
                    for (var key in e) {
                        console.log(key + ' ', e[key]);
                    }
                });
            }

        };
        // Si regresa de ver el detalle de un producto, guarda el número de página en el que iba el usuario, de otra manera empieza en la primer página
        function decide() {
            if ($rootScope.prevState === $rootScope.familiaId) {
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
            if (pro.Oferta.length === 0) {
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
            if (!deviceDetector.isMobile()) {
                var medDetalle = LoadMedByIdSrv.httpReq(item.IdProducto.trim());
                medDetalle.then(function(info) {
                    var datosOfertas = (JSON.parse(info.data.d))[0];

                    $rootScope.tipoDeOferta = item.Oferta[0].TipoOferta;
                    var ofertaTxtF = {
                        "ofertas": []
                    };
                    // console.info( datosOfertas );
                    for (var i = 0; i < datosOfertas.Oferta.length; i++) {
                        var idDelCombo = datosOfertas.Oferta[i].idCombo;
                        console.log(datosOfertas);
                        if (datosOfertas.Oferta[i].Tipo == 1) {
                            ofertaTxtF.ofertas.push({
                                id: datosOfertas.Oferta[i].idproducto.trim(),
                                nombre: datosOfertas.Oferta[i].Nombre,
                                cantidad: datosOfertas.Oferta[i].Cantidad,
                                precio: datosOfertas.Oferta[i].PrecioOferta,
                                ahorro: datosOfertas.Oferta[i].Mensaje,
                                tipo: datosOfertas.Oferta[i].TipoOferta,
                                idCombo: datosOfertas.Oferta[i].idCombo
                            });
                        } else if (datosOfertas.Oferta[i].Tipo == 2) {
                            if (added === 0) {
                                ofertaTxtF.ofertas.push({
                                    id: datosOfertas.Oferta[i].idproducto.trim(),
                                    nombre: datosOfertas.Oferta[i].Nombre,
                                    cantidad: datosOfertas.Oferta[i].Cantidad,
                                    precio: datosOfertas.Oferta[i].PrecioOferta,
                                    ahorro: datosOfertas.Oferta[i].Mensaje,
                                    tipo: datosOfertas.Oferta[i].TipoOferta,
                                    idCombo: datosOfertas.Oferta[i].idCombo
                                });
                                added++;
                            } else {
                                _.extend(_.findWhere(ofertaTxtF.ofertas, { idCombo: idDelCombo }), {
                                    id2: datosOfertas.Oferta[i].idproducto.trim(),
                                    nombre2: datosOfertas.Oferta[i].Nombre
                                });
                            }
                        }
                        /*                        var idDelCombo = datosOfertas.Oferta[i].idCombo;
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
                                                }*/
                    }
                    $rootScope.ofertas = ofertaTxtF.ofertas;
                    // Checa si el combo está completo (hay combos que se hacen con productos que ya no están en catálogo, para que se acaben, en esos casos no se debe mostrar el combo)
                    if ($rootScope.ofertas[0].tipo === 'Combo') {
                        // Combo incompleto
                        if (!$rootScope.ofertas[0].id2) {
                            $rootScope.ofertas = '';
                            // Combo completo, muestra preview
                        } else {
                            colocaPromoView();
                            $('.promoView').fadeIn("slow");
                        }
                        // Combo completo, muestra preview                        
                    } else {
                        colocaPromoView();
                        $('.promoView').fadeIn("slow");
                    }

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
        $scope.closeModal = function() {
            $('.modal').modal('hide');
        };

        $(window).scroll(function() {
            $scope.hidePromo();
        });

        decide();

        banner.random();

        // Procesa datos que angular todavía no ha digerido
        function digiere() {
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        }

    }]);
