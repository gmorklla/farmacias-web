'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:BusquedaCtrl
 * @description
 * # BusquedaCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('BusquedaCtrl', ['$scope', '$log', '$stateParams', '$rootScope', 'busqueda', 'prettyUrlSpc', 'productoSrv', function($scope, $log, $stateParams, $rootScope, busqueda, prettyUrlSpc, productoSrv) {

        $rootScope.muestraCarrito = true;

        $scope.transUrl = function(args) {
            return prettyUrlSpc.prettyUrl(args);
        };

        $scope.etiqueta = $stateParams.promo;
        $scope.sortType = 'item.NombreProducto'; // set the default sort type
        $scope.sortReverse = false; // set the default sort order

        //console.log(LoadMedsSrv.httpReq());
        $scope.meds = [];
        $scope.cuantos = 9;

        $scope.getMeds = function() {

            $("#loadingMeds, #loadingMeds2, .loadScreen").fadeIn("slow");

            $('html, body').animate({
                scrollTop: $(".productos").offset().top
            }, 1000);

            var search = busqueda.buscaPredictiva($stateParams.termino);

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

        function decide() {
            if ($rootScope.prevState === 'busquedaGrupo.detalle') {
                $scope.getMeds();
                $scope.pagina = $rootScope.paginationNumber;
            } else {
                $scope.getMeds();
            }
        };

        $scope.sendProduct = function(pro) {
            productoSrv.addProduct(pro);
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

        $scope.getPromo = function(item) {
            colocaPromoView();
            $('.promoView').fadeIn("slow");
            var ofertaTxtF = {
                "ofertas": []
            }
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

        $scope.hidePromo = function() {
            $rootScope.viewData = '';
            $('.promoView').fadeOut(0);
        };

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

        $scope.guardaPageNum = function(num) {
            $rootScope.paginationNumber = num;
        };

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

        $scope.muestraFiltros = function() {
            $scope.filtros = !$scope.filtros;
        };

        $scope.filtros = false;

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
