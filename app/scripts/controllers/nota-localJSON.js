'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:NotaCtrl
 * @description
 * # NotaCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('NotaCtrl', ['prettyUrlSpc', 'loadData', '_', 'banner', '$stateParams', '$scope', '$rootScope', '$state', '$log', function(prettyUrlSpc, loadData, _, banner, $stateParams, $scope, $rootScope, $state, $log) {

        // Inicializa tooltips de bootstrap
        $('[data-toggle="tooltip"]').tooltip({
            html: 'true',
            container: 'body'
        });
        // Usa servicio 'prettyUrlSpc.deconfig' para quitar guiones
        var original = prettyUrlSpc.deconfig($stateParams.notaId);
        // Define el url que se compartirá en redes sociales
        $scope.urlShare = 'http://www.farmaciasdesimilares.com.mx/propuesta/#!/siminotas/' + $stateParams.notaId;

        var resultado = prettyUrlSpc.deconfig($stateParams.notaId);
        resultado = prettyUrlSpc.capitalize(resultado);
        $stateParams.notaId = resultado;
        // Usa servicio 'loadData.httpReq' para obtener datos de las notas
        var datos = loadData.httpReq('data/siminotas.json');

        datos.then(function(datos) {
            $scope.notaActual = _.findWhere(datos.data.siminotas, {
                url: original
            });
            // Si se da click en el menu y no en una nota en específico, se presenta la última nota
            if (!$scope.notaActual) {
                //$log.info('Indefinido');
                var size = _.size(datos.data.siminotas);
                $scope.notaActual = _.findWhere(datos.data.siminotas, {
                    key: size
                });
                //$log.info($scope.notaActual);
            };

            getNextAndPrev(datos);

        }, function(e) {
            console.log(e);
        });
        // Función que define nota previa y próxima para los botones de navegación
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
        // Función para navegar entre las notas
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
        // Usa servicio 'prettyUrlSpc' para dar formato a un texto, adecuado para su uso en un url 
        $scope.prettyFn = function(args) {
            return prettyUrlSpc.prettyUrl(args);
        };

        banner.random();

        // Retrieve new posts as they are added to our database
        /*ref.on("child_added", function(snapshot, prevChildKey) {
          var newPost = snapshot.val();
          siminotasArray.push(newPost);
        });*/        

    }]);
