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
        // Boolean que controla si se debe o no mostrar el Modal que se usa para buscar productos
        $scope.viewSearchModal = false;
        // Función que controla el modo de búsqueda y usa el servicio 'busqueda.buscaPredictiva' para obtener los resultados
        $scope.doSearch = function(modo) {

            $log.info('Buscando...');
            // Variable que permite o no el paso a la página donde se muestra el resultado de la búsqueda, sólo cuando ya se tiene dicho resultado
            $scope.listo = false;

            var search;
            // Opción Modal
            if (modo === 'modal') {
                // Realiza búsqueda sólo con 3 o más caracteres
                if ($scope.doSearchInput.length < 3) {
                    // Variable que muestra o no el Modal
                    $scope.viewSearchModal = false;
                } else {
                    $scope.viewSearchModal = true;
                    // Variable que muestra o no el loading
                    $scope.searchLoader = true;
                    var cuantos = busqueda.buscaPredictiva($scope.doSearchInput);
                    cuantos.then(function(datos) {
                        $scope.searchResult = JSON.parse(datos.data.d);
                        $scope.searchLoader = false;
                        $scope.terminoBuscado = $scope.doSearchInput;
                        $scope.listo = true;
                    }, function(e) {
                        $log.error(e);
                    });
                }

            } else { // Opción sin Modal

                if ($scope.termino.length < 3) {
                    // Variable que despliega o no el panel con el resultado de la búsqueda
                    $scope.viewSearch = false;
                } else {
                    $scope.viewSearch = true;
                    $scope.searchLoader = true;
                    var cuantos = busqueda.buscaPredictiva($scope.termino, 1);
                    cuantos.then(function(datos) {
                        $scope.searchResult = JSON.parse(datos.data.d);
                        $scope.searchLoader = false;
                        $scope.terminoBuscado = $scope.termino;
                        $scope.listo = true;
                    }, function(e) {
                        $log.error(e);
                    });
                }

            }

        };
        // Usa servicio 'prettyUrlSpc.prettyUrl' para dar formato a un texto, adecuado para su uso en un url 
        $scope.prettyFn = function(args) {
            return prettyUrlSpc.prettyUrl(args);
        };
        // Valor inicial de la variable que controla el despliegue del panel con el resultado de la búsqueda
        $scope.viewSearch = false;
        // Función que oculta panel de resultados y Modal
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
        // Función que borra datos del input de búsqueda cuando comienza el cambio al siguiente estado
        $scope.$on('$locationChangeStart', function(event, next, current) {
            $scope.doSearchInput = '';
            $scope.termino = '';
            $scope.viewSearchModal = false;
            if (!$('.navbar-toggle').hasClass('collapsed')) {
                cierraMenu();
            }
        });
        // Función que espera a que se carguen los resultados para después ir a la página donde se muestran los resultados
        $scope.enterF = function() {
            if($scope.listo === true) {
                $scope.noInput();
                $rootScope.busqueda = true;
                console.info($scope.termino);
                $state.go('busquedaGrupo', {
                    termino: $scope.prettyFn($scope.termino || $scope.doSearchInput)
                });                
            }
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
        // Permite cerrar el Modal haciando click en la página
        $("body").on("click", ".modal-dialog", function(e) {
            if ($(e.target).hasClass('modal-dialog')) {
                var hidePopup = $(e.target.parentElement.parentElement).attr('id');
                $('#' + hidePopup).modal('hide');
            }
        });
        // Autofocus en input de modal
        $('#buscaModal').on('shown.bs.modal', function(e) {
            $log.info('Abierto');
            $('#modalInput').focus();
        });
        // Define tipo de unidad que se presentará en el localiza
        $scope.localizaType = function(type) {
            $rootScope.ubicaType = type;
        };        

    }]);
