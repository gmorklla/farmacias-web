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

        // Referencia a base de datos en Firebase
        var ref = new Firebase("https://farmaciasdesimilares.firebaseio.com/notas");
        // Array en el que se colocarán las notas
        var datos = [];
        // Llamada a firebase para obtener las notas
        ref.once("value", function(snapshot) {
            $scope.notasFirebase = snapshot.val();
            for(var i in $scope.notasFirebase){
                datos.push($scope.notasFirebase[i]);
            }
            $scope.notaActual = _.findWhere(datos, {
                url: original
            });
            // Llamada a función para determinar notas previa y próxima
            getNextAndPrev(datos);
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });

        // Función que define nota previa y próxima para los botones de navegación
        var getNextAndPrev = function(datos) {
            var size = _.size(datos);
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

            $rootScope.notaNext = _.findWhere(datos, {
                key: siguiente
            });

            $rootScope.notaPrev = _.findWhere(datos, {
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
            if(args) {
                return prettyUrlSpc.prettyUrl(args);
            }
        };

        banner.random();

        // Retrieve new posts as they are added to our database
        /*ref.on("child_added", function(snapshot, prevChildKey) {
          var newPost = snapshot.val();
          siminotasArray.push(newPost);
        });*/        

    }]);
