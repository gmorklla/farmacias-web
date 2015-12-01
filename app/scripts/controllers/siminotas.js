'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:SiminotasCtrl
 * @description
 * # SiminotasCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
  .controller('SiminotasCtrl', ['loadData', 'prettyUrlSpc', 'youTubeList', '$scope', '$rootScope', function (loadData, prettyUrlSpc, youTubeList, $scope, $rootScope) {

  	var datos = loadData.httpReq( 'data/siminotas.json' );
    datos.then(function (datos) {
    	$scope.siminotas = datos.data.siminotas;
    	$rootScope.notaFinal = prettyUrlSpc.prettyUrl(datos.data.siminotas[$scope.siminotas.length-1].url);
    }, function (e) {
    	console.log(e);
    });

    var videos = youTubeList.getVids();
    videos.then(function (datos) {
    	console.log(datos);
        $scope.theBestVideo = datos[0].id;
        $scope.listaVideos = datos;
    }, function (e) {
    	console.log(e);
    });

    $scope.cambiaVid = function(id){
        $scope.theBestVideo = id;
    }    

  }]);
