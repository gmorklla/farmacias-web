'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:CarritoctrlCtrl
 * @description
 * # CarritoctrlCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
	.controller('CarritoCtrl', ['prettyUrlSpc', 'CarritoSrv', 'productoSrv', '$scope', function(prettyUrlSpc, CarritoSrv, productoSrv, $scope) {
		$scope.transUrl = function(args) {
			return prettyUrlSpc.prettyUrl(args);
		};

		$scope.sendProduct = function(pro) {
			productoSrv.addProduct(pro);
		};
	}]);