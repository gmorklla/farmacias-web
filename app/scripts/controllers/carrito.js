'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:CarritoctrlCtrl
 * @description
 * # CarritoctrlCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
  .controller('CarritoCtrl',['prettyUrlSpc', 'CarritoSrv', '$scope', function (prettyUrlSpc, CarritoSrv, $scope) {
  	$scope.transUrl = function (args) {
  		return prettyUrlSpc.prettyUrl(args);
  	};
  }]);
