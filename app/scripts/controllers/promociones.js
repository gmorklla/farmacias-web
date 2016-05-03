'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:CarritoctrlCtrl
 * @description
 * # CarritoctrlCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
	.controller('PromocionesCtrl', ['loadData', 'banner', '$scope', '$log', function(loadData, banner, $scope, $log) {
		$scope.titulo = 'Promociones';
		// Usa servicio 'loadData.httpReq' para obtener datos de los anuncios
	    var datos = loadData.httpReq('data/ads.json');

	    datos.then(function(datos) {
	        $scope.ads = datos.data.ads;
	        //$log.info($scope.ads);
	    }, function(e) {
	        console.log(e);
	    });

	    banner.random();

	}]);