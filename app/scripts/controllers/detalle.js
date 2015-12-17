'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:DetalleCtrl
 * @description
 * # DetalleCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
  .controller('DetalleCtrl', ['loadData', '_', 'prettyUrlSpc', 'productoSrv', 'CarritoSrv', '$stateParams', '$scope', '$rootScope', function (loadData, _, prettyUrlSpc, productoSrv, CarritoSrv, $stateParams, $scope, $rootScope) {

	//$scope.url = "http://www.farmaciasdesimilares.com.mx/propuesta/#!" + $location.url();

    if(!productoSrv.getProduct()) {
    	console.log('Viene directo');
    } else {
    	$scope.medActual = productoSrv.getProduct();
    }

    $rootScope.muestraCarrito = true;

    $scope.ocultaCarrito = function () {
      $rootScope.muestraCarrito = false;
    }    

  }]);
