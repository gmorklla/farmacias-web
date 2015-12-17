'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:HigieneCtrl
 * @description
 * # HigieneCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
  .controller('HigieneCtrl', ['LoadHigieneSrv', 'prettyUrlSpc', 'productoSrv', 'CarritoSrv', '$scope', '$rootScope', '$stateParams', function (LoadHigieneSrv, prettyUrlSpc, productoSrv, CarritoSrv, $scope, $rootScope, $stateParams) {

    $rootScope.muestraCarrito = true;

  	$scope.transUrl = function (args) {
  		return prettyUrlSpc.prettyUrl(args);
  	};

  	$scope.etiqueta = $stateParams.promo;
  	$scope.sortType     = 'item.NombreProducto'; // set the default sort type
  	$scope.sortReverse  = false;  // set the default sort order

    //console.log(LoadHigieneSrv.httpReq());
    $scope.meds = [];
    $scope.cuantos = 9;

    $scope.getMeds = function (cuantos, page) {

      $( "#loadingMeds" ).fadeIn( "slow" );
      var medicamentos = LoadHigieneSrv.httpReq(cuantos, page);

      medicamentos.then(function (datos) {
        $( "#loadingMeds" ).fadeOut( "slow" );
        $scope.meds = JSON.parse(datos.data.d);
        $scope.totalMeds = $scope.meds[0].TotalProductos;
      }, function (e) {
        console.log(e);
      });

    };

    $scope.getMeds($scope.cuantos, 1);

    $scope.sendProduct = function (pro) {
    	productoSrv.addProduct(pro);
    };

    $scope.muestraMas = function () {
      $scope.cuantos = $scope.cuantos + 9;
      $scope.getMeds($scope.cuantos, 1);
    };

    $scope.ocultaCarrito = function () {
      $('#carritoPreview').fadeOut( "slow", function () {
        $rootScope.muestraCarrito = false;
      });
    }

  }]);