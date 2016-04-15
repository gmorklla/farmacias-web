'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:PromosCtrl
 * @description
 * # PromosCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
  .controller('PromosCtrl', ['loadData', '$scope', function (loadData, $scope) {
  	// Usa servicio 'loadData.httpReq' para obtener datos de los anuncios
    var datos = loadData.httpReq( 'data/ads.json' );
    
    datos.then(function (datos) {
    	$scope.ads = datos.data.ads;
    }, function (e) {
    	console.log(e);
    });

  }]);
