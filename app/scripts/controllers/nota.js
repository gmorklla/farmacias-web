'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:NotaCtrl
 * @description
 * # NotaCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('NotaCtrl', ['prettyUrlSpc', 'loadData', '_', '$stateParams', '$scope', '$rootScope', '$state', '$log', function(prettyUrlSpc, loadData, _, $stateParams, $scope, $rootScope, $state, $log) {
        //$scope.url = "http://www.farmaciasdesimilares.com.mx/propuesta/#!" + $location.url();

        $('[data-toggle="tooltip"]').tooltip({
            html: 'true',
            container: 'body'
        });
        var original = prettyUrlSpc.deconfig($stateParams.notaId);

        $scope.urlShare = 'http://www.farmaciasdesimilares.com.mx/propuesta/#!/siminotas/' + $stateParams.notaId;

        var datos = loadData.httpReq('data/siminotas.json');

        datos.then(function(datos) {
            $scope.notaActual = _.findWhere(datos.data.siminotas, {
                url: original
            });

            if (!$scope.notaActual) {
                $log.info('Indefinido');
                var size = _.size(datos.data.siminotas);
                $scope.notaActual = _.findWhere(datos.data.siminotas, {
                    key: size
                });
                $log.info($scope.notaActual);
            };

            getNextAndPrev(datos);

        }, function(e) {
            console.log(e);
        });

        var getNextAndPrev = function(datos) {
            var size = _.size(datos.data.siminotas);
            var siguiente;
            var anterior;

            if ($scope.notaActual.key === size) {
                siguiente = 1;
                anterior = $scope.notaActual.key - 1;
            } else if ($scope.notaActual.key === 1) {
                siguiente = $scope.notaActual.key + 1;
                anterior = size;
            } else {
                siguiente = $scope.notaActual.key + 1;
                anterior = $scope.notaActual.key - 1;
            }

            $rootScope.notaNext = _.findWhere(datos.data.siminotas, {
                key: siguiente
            });

            $rootScope.notaPrev = _.findWhere(datos.data.siminotas, {
                key: anterior
            });
        };

        $rootScope.otraNota = function(nota) {
            if (nota === 'prev') {
                $state.go('nota', {
                    notaId: $scope.prettyFn($rootScope.notaPrev.url)
                });
            } else {
                $state.go('nota', {
                    notaId: $scope.prettyFn($rootScope.notaNext.url)
                });
            }
        };

        $scope.prettyFn = function(args) {
            return prettyUrlSpc.prettyUrl(args);
        };

    }]);
