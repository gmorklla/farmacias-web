'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:SiminotasCtrl
 * @description
 * # SiminotasCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('SiminotasCtrl', ['loadData', 'prettyUrlSpc', 'youTubeList', '$scope', '$rootScope', function(loadData, prettyUrlSpc, youTubeList, $scope, $rootScope) {

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
            $scope.siminotas = datos;
            if($scope.siminotas.length == 0) {
                notasIfNoFirebase();
            } else {
                $rootScope.notaFinal = prettyUrlSpc.prettyUrl(datos[$scope.siminotas.length - 1].url);
                digiere();
            }
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);          
        });

        // Fallback si no se logran obtener los datos de las notas a través de firebase
        function notasIfNoFirebase() {
            // Usa servicio 'loadData.httpReq' para obtener datos de las notas de manera local si Firebase no carga
            var datos = loadData.httpReq('data/notas.json');

            datos.then(function(datos) {
                $scope.siminotas = datos.data;
                $rootScope.notaFinal = prettyUrlSpc.prettyUrl(datos.data[$scope.siminotas.length - 1].url);
                digiere();
            }, function(e) {
                console.log(e);
            });            
        }

        // Usa servicio 'prettyUrlSpc.prettyUrl' para dar formato a un texto, adecuado para su uso en un url
        $scope.prettyFn = function(args) {
            return prettyUrlSpc.prettyUrl(args);
        };
        // Usa servicio 'youTubeList.getVids' para obtener lista de videos
        if(!$rootScope.theBestVideo) {
            console.info('No hay video');
            var videos = youTubeList.getVids();
            videos.then(function(datos) {
                $rootScope.theBestVideo = datos[2].id;
                $rootScope.listaVideos = datos;
                $scope.$apply();
            }, function(e) {
                console.log(e);
            });            
        }

        // Cambia el video que se ve
        $scope.cambiaVid = function(id) {
            $scope.theBestVideo = id;
        };

        var w = window.innerWidth;
        // Número de videos thumbnail que se mostrarán
        if (w >= 414) {
            $scope.mostrados = 4;
        } else {
            $scope.mostrados = 2;
        }

        // Procesa datos que angular todavía no ha digerido
        function digiere() {
            if(!$scope.$$phase) {
                $scope.$digest();
            }                
        }

        notasIfNoFirebase();        

    }]);