'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:DetalleCtrl
 * @description
 * # DetalleCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
  .controller('DetalleCtrl', ['loadData', '_', 'prettyUrlSpc', 'productoSrv', 'CarritoSrv', 'LoadMedByIdSrv', 'LoadPromoSrv', 'PromoOrComboSrv', '$stateParams', '$scope', '$rootScope', '$log', function(loadData, _, prettyUrlSpc, productoSrv, CarritoSrv, LoadMedByIdSrv, LoadPromoSrv, PromoOrComboSrv, $stateParams, $scope, $rootScope, $log) {

    $rootScope.tipoDeOferta = '';
    $rootScope.ofertas = [];

    var idProductoParam = $stateParams.idProducto.trim();

    var medDetalle = LoadMedByIdSrv.httpReq(idProductoParam);
    medDetalle.then(function (info) {
      $scope.medActual = JSON.parse(info.data.d)[0];
      $stateParams.medicamentoId = $scope.medActual.SUSTANCIA;
      $scope.getPromo($scope.medActual.ID);
      console.log($scope.medActual);
    }, function (e) {
      $log.error(e);
    });

    $rootScope.muestraCarrito = true;

    $scope.ocultaCarrito = function() {
      $rootScope.muestraCarrito = false;
    };

    $scope.getPromo = function (id) {
      console.clear();

      var datos = LoadPromoSrv.httpReq(id);

      datos.then(function (info) {
        var promoCombo = PromoOrComboSrv.getPromoCombo(info);
        $rootScope.ofertas = promoCombo.ofertas;
        
      }, function (e) {
        $log.error(e);
      });

    };    

  }]);