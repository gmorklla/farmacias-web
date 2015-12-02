'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.producto
 * @description
 * # producto
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
  .service('productoSrv', function () {
	var productoAct;

	var addProduct = function(newObj) {
		productoAct = newObj;
	};

	var getProduct = function(){
		return productoAct;
	};

	return {
		addProduct: addProduct,
		getProduct: getProduct
	};
  });
