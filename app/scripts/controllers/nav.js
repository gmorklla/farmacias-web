'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:NavControl
 * @description
 * # NavControl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
  .controller('NavControl', ['$scope', '$http', '$state', '$location', 'prettyUrlSpc', 'loadData', function ($scope, $http, $state, $location, prettyUrlSpc, loadData) {

    var datos = loadData.httpReq( 'data/medicamentos.json' );
    
    datos.then(function (datos) {
    	$scope.meds = datos.data.medicamentos;
    }, function (e) {
    	console.log(e);
    });

	$scope.prettyFn = function (args) {
		prettyUrlSpc.prettyUrl(args);
	}

	$scope.viewSearch = false;

	$scope.change = function() {
		$scope.viewSearch = true;
	};

	$scope.noInput = function () {
		$scope.viewSearch = false;
		$('#busca').val('');
	};

	var cierraMenu = function () {
		$(".btn-navbar").click(); //bootstrap 2.x
		$(".navbar-toggle").click() //bootstrap 3.x by Richard    
	}

	$scope.$on('$locationChangeStart', function(event, next, current) {
		if( !$('.navbar-toggle').hasClass('collapsed') ){
			cierraMenu();
		}
	});	

  }]);