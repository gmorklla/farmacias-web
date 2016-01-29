'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:BusquedaCtrl
 * @description
 * # BusquedaCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('BusquedaCtrl', ['$scope', '$log', '$stateParams', '$rootScope', 'busqueda', 'prettyUrlSpc', function($scope, $log, $stateParams, $rootScope, busqueda, prettyUrlSpc) {

        $scope.getMeds = function(next, page) {

            if (!$scope.searchResult) {

            	if($rootScope.busqueda === true) {
            		$scope.pagina = 1;
            		$rootScope.busqueda = false;
            	} else {
	                if(!page){
	                	$scope.pagina = 1;
	                } else {
	                	$scope.pagina = page;
	                }
            	}

                $("#loadingMeds, #loadingMeds2, .loadScreen").fadeIn("slow");

                $('html, body').animate({
                    scrollTop: $(".productos").offset().top
                }, 1000);

                if(next === 0) {

                    var verCantidad = busqueda.buscaPredictiva($stateParams.termino, 1);

                    verCantidad.then(function(datos) {
                        var itemP = JSON.parse(datos.data.d);
                        var cantidad = itemP[0].TotalProductos;
                        var search = busqueda.buscaPredictiva($stateParams.termino, cantidad);

                        search.then(function(datos) {
                            $("#loadingMeds, #loadingMeds2, .loadScreen").fadeOut("slow");
                            $scope.searchResult = JSON.parse(datos.data.d);
                        }, function(e) {
                            console.log(e);
                        });
                    }, function(e) {
                        console.log(e);
                    });
                } else {
                    $("#loadingMeds, #loadingMeds2, .loadScreen").fadeOut("slow");
                }             

/*                var search = busqueda.buscaPredictiva($stateParams.termino, 32);

                search.then(function(datos) {
                    $("#loadingMeds, #loadingMeds2, .loadScreen").fadeOut("slow");
                    $scope.searchResult = JSON.parse(datos.data.d);
                    $log.info($scope.searchResult);
                    $scope.searchLoader = false;
                }, function(e) {
                    console.log(e);
                });*/
            } else {

            	if($rootScope.busqueda === true) {
            		$scope.pagina = 1;
            		$rootScope.busqueda = false;            		
            	} else {
	                var page = page;

	                $rootScope.paginationNumber = page;

	                if (!$rootScope.paginationNumber) {
	                    page = 1;
	                }
            	}

                $("#loadingMeds, #loadingMeds2, .loadScreen").fadeIn("slow");

                $('html, body').animate({
                    scrollTop: $(".productos").offset().top
                }, 1000, function () {
                	$("#loadingMeds, #loadingMeds2, .loadScreen").fadeOut("slow");
                });

            }

        }

        if ($rootScope.prevState === 'busquedaGrupo.busqueda') {
        	$log.info('Regresa: ' + $rootScope.paginationNumber);
        	$scope.pagina = $rootScope.paginationNumber;
            $scope.getMeds(0, $rootScope.paginationNumber);
        } else {
            $scope.getMeds(0, 1);
        }

        $scope.transUrl = function(args) {
            return prettyUrlSpc.prettyUrl(args);
        };        

    }]);
