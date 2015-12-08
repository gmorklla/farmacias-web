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
    	console.log('Viene directo');
    } else {
    	$scope.medActual = productoSrv.getProduct();
    }

  }]);
