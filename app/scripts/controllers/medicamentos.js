'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:MedicamentosCtrl
 * @description
 * # MedicamentosCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('MedicamentosCtrl', ['LoadMedsSrv', 'prettyUrlSpc', 'productoSrv', 'CarritoSrv', 'LoadPromoSrv', 'PromoOrComboSrv', '$scope', '$rootScope', '$stateParams', '$log', '$timeout', '$window', function(LoadMedsSrv, prettyUrlSpc, productoSrv, CarritoSrv, LoadPromoSrv, PromoOrComboSrv, $scope, $rootScope, $stateParams, $log, $timeout, $window) {

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

        $scope.getMeds = function(cuantos, page) {

            var page = page;

            $rootScope.paginationNumber = page;

            if(!$rootScope.paginationNumber){
                page = 1;
            }

            $("#loadingMeds, #loadingMeds2, .loadScreen").fadeIn("slow");

            $('html, body').animate({
                scrollTop: $(".productos").offset().top
            }, 1000);

            var medicamentos = LoadMedsSrv.httpReq(cuantos, page);

            medicamentos.then(function(datos) {
                $("#loadingMeds, #loadingMeds2, .loadScreen").fadeOut("slow");

                $scope.meds = JSON.parse(datos.data.d);
                $scope.totalMeds = $scope.meds[0].TotalProductos;
            }, function(e) {
                console.log(e);
            });

        };

        if ($rootScope.prevState === 'medicamentos.detalle') {
            $scope.getMeds($scope.cuantos, $rootScope.paginationNumber);
            $scope.pagina = $rootScope.paginationNumber;
        } else {
            $scope.getMeds($scope.cuantos, 1);
        }

        $scope.sendProduct = function(pro) {
            productoSrv.addProduct(pro);
        };

        $scope.muestraMas = function() {
            $scope.cuantos = $scope.cuantos + 9;
            $scope.getMeds($scope.cuantos, 1);
        };

        $scope.ocultaCarrito = function() {
            $('#carritoPreview').fadeOut("slow", function() {
                $rootScope.muestraCarrito = false;
            });
        };

        $scope.getPromo = function(id) {
            console.clear();

            var datos = LoadPromoSrv.httpReq(id);

            datos.then(function(info) {
                var promoCombo = PromoOrComboSrv.getPromoCombo(info);
                $rootScope.ofertas = promoCombo.ofertas;

                colocaPromoView();
                $('.promoView').fadeIn("slow");

            }, function(e) {
                $log.error(e);
            });

        };

        $scope.hidePromo = function() {
            $rootScope.viewData = '';
            $('.promoView').fadeOut("slow");
        };

        function colocaPromoView() {
            var element = document.getElementById('carritoNav'); //replace elementId with your element's Id.
            var rect = element.getBoundingClientRect();
            var elementLeft, elementTop; //x and y
            var scrollTop = document.documentElement.scrollTop ?
                document.documentElement.scrollTop : document.body.scrollTop;
            var scrollLeft = document.documentElement.scrollLeft ?
                document.documentElement.scrollLeft : document.body.scrollLeft;
            elementTop = rect.top + scrollTop + 50;
            elementLeft = rect.left + scrollLeft - 261;

            $('.promoView').css({
                'top': elementTop,
                'left': elementLeft
            });
        };


    }]);
