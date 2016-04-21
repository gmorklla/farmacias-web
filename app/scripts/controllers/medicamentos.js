'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:MedicamentosCtrl
 * @description
 * # MedicamentosCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('MedicamentosCtrl', ['LoadMedsSrv', 'prettyUrlSpc', 'productoSrv', 'CarritoSrv', 'banner', 'deviceDetector', '$scope', '$rootScope', '$stateParams', '$log', '$timeout', '$window', '$state', '$filter', function(LoadMedsSrv, prettyUrlSpc, productoSrv, CarritoSrv, banner, deviceDetector, $scope, $rootScope, $stateParams, $log, $timeout, $window, $state, $filter) {

        $rootScope.muestraCarrito = true;
        // Usa servicio 'prettyUrlSpc' para dar formato a un texto, adecuado para su uso en un url 
        $scope.transUrl = function(args) {
            return prettyUrlSpc.prettyUrl(args);
        };

        $scope.etiqueta = $stateParams.promo;
        $scope.sortType = 'item.NombreProducto'; // set the default sort type
        $scope.sortReverse = false; // set the default sort order

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
        // Define la familia a la que pertenecen los productos de acuerdo al estado en el que nos encontramos
        $scope.familia = $state.$current.name;

        var familia = '';
        // Establece datos de acuerdo a la familia
        switch ($state.$current.name) {
            case 'medicamentos':
                familia = 'MEDICAMENTOS'
                $rootScope.familiaId = 'medicamentos.detalle';
                $scope.calificable = 1;
                break;
            case 'vitaminas':
                familia = 'VITAMINAS Y SUPLEMENTOS'
                $rootScope.familiaId = 'vitaminas.detalle';
                $scope.calificable = 0;
                break;
            case 'higiene':
                familia = 'HIGIENE Y PERFUMERIA'
                $rootScope.familiaId = 'higiene.detalle';
                $scope.calificable = 0;
                break;
            case 'curacion':
                familia = 'MATERIAL DE CURACION'
                $rootScope.familiaId = 'curacion.detalle';
                $scope.calificable = 1;
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
                break;                
        }
        // Función que usa servicio 'LoadMedsSrv.httpReq' para buscar productos de la familia deseada
        $scope.getMeds = function() {

            $("#loadingMeds, #loadingMeds2, .loadScreen").fadeIn("slow");
            $scope.muestraAlerta = false;

            $('html, body').animate({
                scrollTop: $("html").offset().top
            }, 1000);

            var medicamentos = LoadMedsSrv.httpReq(familia);
            var sitemap = '';

            medicamentos.then(function(datos) {
                if (!$scope.pagina) {
                    $scope.pagina = 1;
                }
                $("#loadingMeds, #loadingMeds2, .loadScreen").fadeOut("slow");
                //$scope.meds = $filter('filter')(JSON.parse(datos.data.d), {$:"https://fsappmovilstorage.blob.core.windows.net/imagenes/"});
                $scope.meds = JSON.parse(datos.data.d);
                //console.log($scope.meds);
                if ($scope.familia == 'nuevos') {
                    $scope.meds = $filter('filter')($scope.meds, true);
                }
                if ($scope.familia == 'sitemap') {
                    //console.info(typeof $scope.meds);
                    for (var i = $scope.meds.length - 1; i >= 0; i--) {
                        var concatenado = '<url><loc>http://farmaciasdesimilares.com.mx/#/medicamentos/' + $scope.meds[i].IdProducto + '/' + $scope.transUrl($scope.meds[i].NombreProducto) + '</loc></url>';
                        sitemap += concatenado;
                    }
                    $('#jsonHere').html(sitemap.toString());
                }
                $scope.muestraAlerta = true;
                /*for (var key in $scope.meds[29]) {
                    console.log(key + ' ', $scope.meds[29][key]);
                }
                for (var key in $scope.meds[29].Oferta[0]) {
                    console.info(key + ' ', $scope.meds[29].Oferta[0][key]);
                }*/
            }, function(e) {
                $scope.muestraAlerta = true;
                for (var key in e) {
                    console.log(key + ' ', e[key]);
                }
            });

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
        var timer;
        // Si el producto tiene alguna promoción, esta función se encarga de presentar los datos de dicha promoción
        $scope.getPromo = function(item) {
            if(!deviceDetector.isMobile()){
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
            }
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
        };
        // Guarda el número de página (paginación) en el que va el usuario
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

        banner.random();

    }]);
