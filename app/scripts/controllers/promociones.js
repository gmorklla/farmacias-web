'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:CarritoctrlCtrl
 * @description
 * # CarritoctrlCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
	.controller('PromocionesCtrl', ['loadData', '$scope', '$log', function(loadData, $scope, $log) {
		$scope.titulo = 'Promociones';
		$log.info($scope.titulo);
	    var datos = loadData.httpReq('data/ads.json');

	    datos.then(function(datos) {
	        $scope.ads = datos.data.ads;
	        $log.info($scope.ads);
	    }, function(e) {
	        console.log(e);
	    });

	}]);