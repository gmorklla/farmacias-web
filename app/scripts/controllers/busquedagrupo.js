'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:BusquedaCtrl
 * @description
 * # BusquedaCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('BusquedaCtrl', ['$scope', '$log', '$stateParams', '$state', '$rootScope', 'busqueda', 'prettyUrlSpc', 'productoSrv', 'jQuery', function($scope, $log, $stateParams, $state, $rootScope, busqueda, prettyUrlSpc, productoSrv, $) {

        $rootScope.muestraCarrito = true;
        // Usa servicio 'prettyUrlSpc' para dar formato a un texto, adecuado para su uso en un url 
        $scope.transUrl = function(args) {
            return prettyUrlSpc.prettyUrl(args);
        };

        $scope.etiqueta = $stateParams.promo;
        $scope.sortType = 'item.NombreProducto'; // set the default sort type
        $scope.sortReverse = false; // set the default sort order

        $scope.meds = [];
        $scope.cuantos = 9;
        // Función que usa servicio 'busqueda.buscaPredictiva' para buscar productos con el texto ingresado por el usuario
        $scope.getMeds = function() {

            $("#loadingMeds, #loadingMeds2, .loadScreen").fadeIn("slow");

            $('html, body').animate({
                scrollTop: $(".productos").offset().top
            }, 1000);

            //console.info($stateParams.termino);

            var search;

            if( $state.$current.name == 'nuevos' ) {
                console.log('Aqui');
                $scope.showPromos = 1;
                search = busqueda.buscaPredictiva(prettyUrlSpc.deconfig('nuevo'));
            } else {
                $scope.showPromos = 1;
                if($stateParams.termino){
                    search = busqueda.buscaPredictiva(prettyUrlSpc.deconfig($stateParams.termino));
                } else {
                    $state.go('inicio');                     
                }
            }

            search.then(function(datos) {
                if (!$scope.pagina) {
                    $scope.pagina = 1;
                }                            
                $("#loadingMeds, #loadingMeds2, .loadScreen").fadeOut("slow");
                $scope.meds = JSON.parse(datos.data.d);
            }, function(e) {
                console.log(e);
            });

        };
        // Si regresa de ver el detalle de un producto, guarda el número de página en el que iba el usuario, de otra manera empieza en la primer página
        function decide() {
            if ($rootScope.prevState === 'busquedaGrupo.detalle') {
                $scope.getMeds();
                $scope.pagina = $rootScope.paginationNumber;
            } else {
                $scope.getMeds();
            }
        }
        // Guarda los datos del producto al que se le hizo click para presentar la información de manera rápida al usuario en la vista de detalle
        $scope.sendProduct = function(pro) {
            productoSrv.addProduct(pro);
        };

        /*$scope.muestraMas = function() {
            $scope.cuantos = $scope.cuantos + 9;
            $scope.getMeds();
        };

        $scope.ocultaCarrito = function() {
            $('#carritoPreview').fadeOut("slow", function() {
                $rootScope.muestraCarrito = false;
            });
        };*/
        // Si el producto tiene alguna promoción, esta función se encarga de presentar los datos de dicha promoción
        $scope.getPromo = function(item) {
            colocaPromoView();
            $('.promoView').fadeIn("slow");
            var ofertaTxtF = {
                "ofertas": []
            };
            $rootScope.tipoDeOferta = item.Oferta[0].TipoOferta;
            for (var i = 0; i < item.Oferta.length; i++) {
                ofertaTxtF.ofertas.push({
                    id: item.IdProducto.trim(),
                    description: item.Oferta[i].Descripcion,
                    cantidad: item.Oferta[i].Cantidad,
                    precio: item.Oferta[i].PrecioOferta,
                    ahorro: item.Oferta[i].Mensaje
                });
            }
            $rootScope.ofertas = ofertaTxtF.ofertas;
        };
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
        }
        // Guarda el número de página (paginación) en el que va el usuario
        $scope.guardaPageNum = function(num) {
            $rootScope.paginationNumber = num;
        };
        // 
        $scope.getPreview = function(item) {
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

        decide();               

    }]);
