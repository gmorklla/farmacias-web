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

        var datos = loadData.httpReq('data/siminotas.json');
        datos.then(function(datos) {
            $scope.siminotas = datos.data.siminotas;
            $rootScope.notaFinal = prettyUrlSpc.prettyUrl(datos.data.siminotas[$scope.siminotas.length - 1].url);
        }, function(e) {
            console.log(e);
        });

        $scope.prettyFn = function(args) {
            return prettyUrlSpc.prettyUrl(args);
        };

        var videos = youTubeList.getVids();
        videos.then(function(datos) {
            $scope.theBestVideo = datos[0].id;
            $scope.listaVideos = datos;
            $scope.$apply();
        }, function(e) {
            console.log(e);
        });

        $scope.cambiaVid = function(id) {
            $scope.theBestVideo = id;
        };

        var w = window.innerWidth;

        if (w >= 414) {
            $scope.mostrados = 4;
        } else {
            $scope.mostrados = 2;
        }

    }]);