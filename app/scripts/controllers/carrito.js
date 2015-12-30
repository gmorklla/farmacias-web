'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:CarritoctrlCtrl
 * @description
 * # CarritoctrlCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
	.controller('CarritoCtrl', ['prettyUrlSpc', 'CarritoSrv', 'LoadPromoSrv', 'PromoOrComboSrv', '$scope', '$log', function(prettyUrlSpc, CarritoSrv, LoadPromoSrv, PromoOrComboSrv, $scope, $log) {
		$scope.transUrl = function(args) {
			return prettyUrlSpc.prettyUrl(args);
		};

		$scope.getPromo = function(id) {
			console.clear();

			var datos = LoadPromoSrv.httpReq(id);

			datos.then(function(info) {
				var promoCombo = PromoOrComboSrv.getPromoCombo(info);
				$scope.ofertaXProbar = promoCombo.ofertas;
				$log.info($scope.ofertaXProbar);

			}, function(e) {
				$log.error(e);
			});

		};


	}]);