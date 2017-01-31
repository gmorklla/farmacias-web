'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:CarritoctrlCtrl
 * @description
 * # CarritoctrlCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
	.controller('PromocionesCtrl', ['loadData', 'banner', '$scope', '$log', '$state', function(loadData, banner, $scope, $log, $state) {
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

	    $scope.cierraGoTo = function (item) {
        	$('.modal').modal('hide');
        	if(item.med) {
        		setTimeout(function(){ $state.go(item.url, { idProducto: item.id, medicamentoId: item.med }); }, 500);
        	} else {
        		setTimeout(function(){ $state.go(item.url); }, 500);
        	}
	    }

	}]);