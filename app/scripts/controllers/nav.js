'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:NavControl
 * @description
 * # NavControl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('NavCtrl', ['$scope', '$rootScope', '$log', '$state', 'prettyUrlSpc', 'loadData', 'productoSrv', 'busqueda', function($scope, $rootScope, $log, $state, prettyUrlSpc, loadData, productoSrv, busqueda) {

        $scope.viewSearchModal = false;

        var datos = loadData.httpReq('data/medicamentos.json');

        datos.then(function(datos) {
            $scope.meds = datos.data.medicamentos;
        }, function(e) {
            console.log(e);
        });

        $scope.doSearch = function(modo) {

            $log.info('Buscando...');

            var search;

            if (modo === 'modal') {

                if ($scope.doSearchInput.length < 3) {
                    $scope.viewSearchModal = false;
                } else {
                    $scope.viewSearchModal = true;
                    $scope.searchLoader = true;
                    var cuantos = busqueda.buscaPredictiva($scope.doSearchInput);
                    cuantos.then(function(datos) {
                        $scope.searchResult = JSON.parse(datos.data.d);
                        $scope.searchLoader = false;
                        $scope.terminoBuscado = $scope.doSearchInput;
                    }, function(e) {
                        $log.error(e);
                    });
                }

            } else {

                if ($scope.termino.length < 3) {
                    $scope.viewSearch = false;
                } else {
                    $scope.viewSearch = true;
                    $scope.searchLoader = true;
                    var cuantos = busqueda.buscaPredictiva($scope.termino, 1);
                    cuantos.then(function(datos) {
                        $scope.searchResult = JSON.parse(datos.data.d);
                        for(var key in $scope.searchResult[0]){
                            $log.info(key + ' ', $scope.searchResult[0][key]);
                        }
                        $scope.searchLoader = false;
                        $scope.terminoBuscado = $scope.termino;
                    }, function(e) {
                        $log.error(e);
                    });
                }

            }

        };

        $scope.prettyFn = function(args) {
            return prettyUrlSpc.prettyUrl(args);
        };

        $scope.viewSearch = false;

        $scope.change = function() {
            $scope.viewSearch = true;
        };

        $scope.noInput = function() {
            $('#buscaModal').modal('hide');
            $('.modal-backdrop').remove();
            $scope.viewSearch = false;
            $('#busca').val('');
        };

        var cierraMenu = function() {
            $(".btn-navbar").click(); //bootstrap 2.x
            $(".navbar-toggle").click(); //bootstrap 3.x by Richard    
        };

        $scope.$on('$locationChangeStart', function(event, next, current) {
            $scope.doSearchInput = '';
            $scope.termino = '';
            $scope.viewSearchModal = false;
            if (!$('.navbar-toggle').hasClass('collapsed')) {
                cierraMenu();
            }
        });

        $scope.sendProduct = function() {
            //productoSrv.addProduct(pro);
        };

        $scope.enterF = function() {
            $log.info($scope.termino);
            $scope.noInput();
            $rootScope.busqueda = true;
            $state.go('busquedaGrupo', {
                termino: $scope.prettyFn($scope.termino || $scope.doSearchInput)
            });
        };

        /*      $('#carritoNav').hover(function() {
                    $rootScope.intervalo = setInterval(function() {
                        colocaCarritoPreview();
                        $('.carritoPreviewNav').fadeIn("slow");
                    }, 500);
                }, function() {
                    clearInterval($rootScope.intervalo);
                    $('.carritoPreviewNav').fadeOut("slow");
                });*/

        function colocaCarritoPreview() {
            var element = document.getElementById('carritoNav'); //replace elementId with your element's Id.
            var rect = element.getBoundingClientRect();
            var elementLeft, elementTop; //x and y
            var scrollTop = document.documentElement.scrollTop ?
                document.documentElement.scrollTop : document.body.scrollTop;
            var scrollLeft = document.documentElement.scrollLeft ?
                document.documentElement.scrollLeft : document.body.scrollLeft;
            elementTop = rect.top + scrollTop + 50;
            elementLeft = rect.left + scrollLeft - 261;

            $('.carritoPreviewNav').css({
                'top': elementTop,
                'left': elementLeft
            });
        };

        $("body").on("click", ".modal-dialog", function(e) {
            if ($(e.target).hasClass('modal-dialog')) {
                var hidePopup = $(e.target.parentElement.parentElement).attr('id');
                $('#' + hidePopup).modal('hide');
            }
        });

        $('#buscaModal').on('shown.bs.modal', function(e) {
            $log.info('Abierto');
            $('#modalInput').focus();
        });

        $scope.localizaType = function(type) {
            $rootScope.ubicaType = type;
        };        

    }]);
