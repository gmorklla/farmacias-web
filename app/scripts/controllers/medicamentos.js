'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:MedicamentosCtrl
 * @description
 * # MedicamentosCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
  .controller('MedicamentosCtrl', ['loadData', 'prettyUrlSpc', 'productoSrv', '$scope', '$stateParams', function (loadData, prettyUrlSpc, productoSrv, $scope, $stateParams) {
	
  	$scope.transUrl = function (args) {
  		return prettyUrlSpc.prettyUrl(args);
  	};

	$scope.etiqueta = $stateParams.promo;
	$scope.sortType     = 'item.medicamentoId'; // set the default sort type
	$scope.sortReverse  = true;  // set the default sort order

    var datos = loadData.httpReq( 'data/medicamentos.json' );
    
    datos.then(function (datos) {
    	$scope.meds = datos.data.medicamentos;
    }, function (e) {
    	console.log(e);
    });

    $scope.sendProduct = function (pro) {
    	productoSrv.addProduct(pro);
    };

  }]);
