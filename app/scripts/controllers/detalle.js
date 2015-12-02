'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:DetalleCtrl
 * @description
 * # DetalleCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
  .controller('DetalleCtrl', ['loadData', '_', 'prettyUrlSpc', 'productoSrv', '$stateParams', '$scope', function (loadData, _, prettyUrlSpc, productoSrv, $stateParams, $scope) {

	//$scope.url = "http://www.farmaciasdesimilares.com.mx/propuesta/#!" + $location.url();

    if(!productoSrv.getProduct()) {
		var original = prettyUrlSpc.deconfig($stateParams.medicamentoId).toUpperCase();

	    var datos = loadData.httpReq( 'data/medicamentos.json' );
	    
	    datos.then(function (datos) {
	    	$scope.medActual = _.findWhere(datos.data.medicamentos, {medicamentoId: original});
	    }, function (e) {
	    	console.log(e);
	    });

    } else {
    	$scope.medActual = productoSrv.getProduct();
    }

  }]);
