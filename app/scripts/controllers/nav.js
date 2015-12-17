
'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:NavControl
 * @description
 * # NavControl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
  .controller('NavCtrl', ['$scope', '$rootScope', 'prettyUrlSpc', 'loadData', 'productoSrv', function ($scope, $rootScope, prettyUrlSpc, loadData, productoSrv) {

    var datos = loadData.httpReq( 'data/medicamentos.json' );
    
    datos.then(function (datos) {
    	$scope.meds = datos.data.medicamentos;
    }, function (e) {
    	console.log(e);
    });

	$scope.prettyFn = function (args) {
		return prettyUrlSpc.prettyUrl(args);
	};

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
		$(".navbar-toggle").click(); //bootstrap 3.x by Richard    
	};

	$scope.$on('$locationChangeStart', function(event, next, current) {
		if( !$('.navbar-toggle').hasClass('collapsed') ){
			cierraMenu();
		}
	});

    $scope.sendProduct = function (pro) {
    	productoSrv.addProduct(pro);
    };

    $( '#carritoNav' ).hover( function () {
    	$rootScope.intervalo = setInterval(function(){
    		colocaCarritoPreview();
			$('.carritoPreviewNav').fadeIn( "slow" );
    	}, 500);
    }, function () {
    	clearInterval($rootScope.intervalo);
    	$('.carritoPreviewNav').fadeOut( "slow" );
    });

    function colocaCarritoPreview () {
		var element = document.getElementById('carritoNav'); //replace elementId with your element's Id.
		var rect = element.getBoundingClientRect();
		var elementLeft,elementTop; //x and y
		var scrollTop = document.documentElement.scrollTop?
		                document.documentElement.scrollTop:document.body.scrollTop;
		var scrollLeft = document.documentElement.scrollLeft?                   
		                 document.documentElement.scrollLeft:document.body.scrollLeft;
		elementTop = rect.top + scrollTop + 50;
		elementLeft = rect.left + scrollLeft - 261;

		$('.carritoPreviewNav').css({
		   'top' : elementTop,
		   'left' : elementLeft
		});    	
    }

  }]);