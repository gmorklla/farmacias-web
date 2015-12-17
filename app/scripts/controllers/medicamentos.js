'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:MedicamentosCtrl
 * @description
 * # MedicamentosCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
  .controller('MedicamentosCtrl', ['LoadMedsSrv', 'prettyUrlSpc', 'productoSrv', 'CarritoSrv', 'LoadPromoSrv', '$scope', '$rootScope', '$stateParams', '$log', '$timeout', function (LoadMedsSrv, prettyUrlSpc, productoSrv, CarritoSrv, LoadPromoSrv, $scope, $rootScope, $stateParams, $log, $timeout) {
	
    $rootScope.muestraCarrito = true;

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
    };

    $scope.ocultaCarrito = function () {
      $('#carritoPreview').fadeOut( "slow", function () {
        $rootScope.muestraCarrito = false;
      });
    };

    $scope.getPromo = function (producto, id) {
      console.clear();

      $scope.promocion = LoadPromoSrv.httpReq(id);

      $scope.promocion.then(function (datos) {
        $scope.oferta = JSON.parse(datos.data.d);
        if(producto.Oferta === 'OFERTA'){        
            for (var i = 0; i < $scope.oferta[0].oferta.length; i++) {              
                $scope.ofertaTxtF = $scope.oferta[0].oferta[i].DESCRIPCIONBASE + ' ' + $scope.oferta[0].oferta[i].PRODUCTOS + ' x ' + $scope.oferta[0].oferta[i].PRECIOOFERTASINIVA;                
            }
            
            $timeout(function(){
                $scope.viewData = $scope.ofertaTxtF;
                $scope.$digest();//any code in here will automatically have an apply run afterwards
            });
        } else if(producto.Oferta === 'COMBO'){
            var combo = '';
            for (var j = 0; j < $scope.oferta[0].oferta.length; j++) {
                if(j === 0){
                    combo += $scope.oferta[0].oferta[j].DESCRIPCIONBASE + ' + ';
                } else {
                    combo += $scope.oferta[0].oferta[j].DESCRIPCIONBASE + ' x ';
                    combo += $scope.oferta[0].oferta[j].PREVTAOFERTACONIVA;
                }
            }
            $log.log(combo);
            $scope.viewData = combo;
        }
      }, function (e) {
        console.log(e);
      });

    };

  }]);
