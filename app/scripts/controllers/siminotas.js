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
        // Usa servicio 'loadData.httpReq' para cargar notas
        var datos = loadData.httpReq('data/siminotas.json');
        datos.then(function(datos) {
            $scope.siminotas = datos.data.siminotas;
            $rootScope.notaFinal = prettyUrlSpc.prettyUrl(datos.data.siminotas[$scope.siminotas.length - 1].url);
        }, function(e) {
            console.log(e);
        });
        // Usa servicio 'prettyUrlSpc.prettyUrl' para dar formato a un texto, adecuado para su uso en un url
        $scope.prettyFn = function(args) {
            return prettyUrlSpc.prettyUrl(args);
        };
        // Usa servicio 'youTubeList.getVids' para obtener lista de videos
        var videos = youTubeList.getVids();
        videos.then(function(datos) {
            $scope.theBestVideo = datos[0].id;
            $scope.listaVideos = datos;
            $scope.$apply();
        }, function(e) {
            console.log(e);
        });
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

    }]);