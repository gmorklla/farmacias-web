'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:NotaCtrl
 * @description
 * # NotaCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
  .controller('NotaCtrl', ['prettyUrlSpc', 'loadData', '_', '$stateParams', '$scope', function (prettyUrlSpc, loadData, _, $stateParams, $scope) {
		//$scope.url = "http://www.farmaciasdesimilares.com.mx/propuesta/#!" + $location.url();
		var original = prettyUrlSpc.deconfig($stateParams.notaId);

	    var datos = loadData.httpReq( 'data/siminotas.json' );
	    
	    datos.then(function (datos) {
	    	$scope.notaActual = _.findWhere(datos.data.siminotas, {url: original});
	    }, function (e) {
	    	console.log(e);
	    });
  }]);
