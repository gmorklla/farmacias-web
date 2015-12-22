'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.producto
 * @description
 * # producto
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
  .service('productoSrv',['$rootScope', function ($rootScope) {
	$rootScope.productoAct = {};

	var addProduct = function(newObj) {
		console.log(newObj);
		$rootScope.productoAct = newObj;
	};

	var getProduct = function(){
		return $rootScope.productoAct;
	};

	return {
		addProduct: addProduct,
		getProduct: getProduct
	};
  }]);
