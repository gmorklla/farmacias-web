'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:MedicamentosCtrl
 * @description
 * # MedicamentosCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
  .controller('MedicamentosCtrl', ['loadData', 'LoadMedsSrv', 'prettyUrlSpc', 'productoSrv', 'CarritoSrv', '$scope', '$stateParams', '$http', function (loadData, LoadMedsSrv, prettyUrlSpc, productoSrv, CarritoSrv, $scope, $stateParams, $http) {
	
  	$scope.transUrl = function (args) {
  		return prettyUrlSpc.prettyUrl(args);
  	};

  	$scope.etiqueta = $stateParams.promo;
  	$scope.sortType     = 'item.NombreProducto'; // set the default sort type
  	$scope.sortReverse  = false;  // set the default sort order

    //console.log(LoadMedsSrv.httpReq());
    $scope.meds = [];
    $scope.cuantos = 9;

    $scope.getMeds = function (cuantos, page) {

      $( "#loadingMeds" ).fadeIn( "slow" );
      var medicamentos = LoadMedsSrv.httpReq(cuantos, page);

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
    }

  }]);
