'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:NuevosCtrl
 * @description
 * # NuevosCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('NuevosCtrl', ['$scope', '$log', '$stateParams', '$rootScope', 'busqueda', 'prettyUrlSpc', '_', function($scope, $log, $stateParams, $rootScope, busqueda, prettyUrlSpc, _) {
        $scope.getMeds = function(next, page) {

            $("#loadingMeds, #loadingMeds2, .loadScreen").fadeIn("slow");

            $('html, body').animate({
                scrollTop: $(".productos").offset().top
            }, 1000);

            if (!page) {
                $scope.pagina = 1;
            } else {
                $scope.pagina = page;
                $rootScope.paginationNumber = page;
            }

            if(next === 0) {
                var cuantos = busqueda.buscaPredictiva('nuevos', 1);

                cuantos.then(function(datos) {
                    var itemP = JSON.parse(datos.data.d);
                    var cantidad = itemP[0].TotalProductos;
                    var search = busqueda.buscaPredictiva('nuevos', cantidad);

                    search.then(function(datos) {
                        $scope.searchResult = (_.sortBy(JSON.parse(datos.data.d), 'FechaInclusion')).reverse();
                        $("#loadingMeds, #loadingMeds2, .loadScreen").fadeOut("slow");
                    }, function(e) {
                        console.log(e);
                    });
                }, function(e) {
                    console.log(e);
                });
            } else {
                $("#loadingMeds, #loadingMeds2, .loadScreen").fadeOut("slow");
            }

        };

        $scope.lazyLayout = _.debounce($scope.getMeds, 500);

        if ($rootScope.prevState === 'nuevos.detalle') {
            $log.info('Regresa');
            $scope.pagina = $rootScope.paginationNumber;
            $scope.lazyLayout(0, $rootScope.paginationNumber);
        } else {
            $scope.lazyLayout(0, 1);
        }

        $scope.transUrl = function(args) {
            return prettyUrlSpc.prettyUrl(args);
        };

        $scope.getDate = function(fecha) {
            var x = fecha.indexOf("(") + 1;
            var y = fecha.indexOf(")");
            var res = parseInt(fecha.substring(x, y));
            var d = new Date(res);
            var options = {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric"
            };
            return d.toLocaleDateString("es-ES", options);
        };        

    }]);
