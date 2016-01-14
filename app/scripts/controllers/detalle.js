'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:DetalleCtrl
 * @description
 * # DetalleCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
  .controller('DetalleCtrl', ['loadData', '_', 'prettyUrlSpc', 'productoSrv', 'CarritoSrv', 'LoadMedByIdSrv', 'LoadPromoSrv', 'PromoOrComboSrv', 'Califica', '$state', '$stateParams', '$scope', '$rootScope', '$log', function(loadData, _, prettyUrlSpc, productoSrv, CarritoSrv, LoadMedByIdSrv, LoadPromoSrv, PromoOrComboSrv, Califica, $state, $stateParams, $scope, $rootScope, $log) {

    $scope.transUrl = function (args) {
      return prettyUrlSpc.prettyUrl(args);
    };

    $rootScope.tipoDeOferta = '';
    $rootScope.ofertas = [];

    var idProductoParam = $stateParams.idProducto.trim();

    var medDetalle = LoadMedByIdSrv.httpReq(idProductoParam);
    medDetalle.then(function (info) {
      $scope.medActual = JSON.parse(info.data.d)[0];
      $stateParams.medicamentoId = $scope.medActual.SUSTANCIA;
      $scope.getPromo($scope.medActual.ID);
/*      for (var prop in $scope.medActual) {
        console.log("Med." + prop + " = " + $scope.medActual[prop] + ' | ' + typeof $scope.medActual[prop]);
      }*/
    }, function (e) {
      $log.error(e);
    });

    $rootScope.muestraCarrito = true;

    $scope.ocultaCarrito = function() {
      $rootScope.muestraCarrito = false;
    };

    $scope.getPromo = function (id) {
      //console.clear();

      var datos = LoadPromoSrv.httpReq(id);

      datos.then(function (info) {
        var promoCombo = PromoOrComboSrv.getPromoCombo(info);
        $rootScope.ofertas = promoCombo.ofertas;
        
      }, function (e) {
        $log.error(e);
      });

    };

    $scope.calificaText = '';
    $scope.enviado = 0;

    $scope.califica = function () {
      var calificacionAct = $('.glyphicon-star').length - 1;
      console.log(calificacionAct);
      console.log($scope.calificaText);
      console.log(idProductoParam);

      var calificacion = Califica.postCalificacion(idProductoParam, calificacionAct, $scope.calificaText);

      //$('#estrellas').modal('hide');
      $scope.calificaForm.$setUntouched();
      $scope.enviado = 1;

      calificacion.then(function(datos) {
        var yaCalificado = JSON.parse(datos.data.d);
        $log.info('Calificado!');
        console.log(yaCalificado);
      }, function(e) {
        $log.info('Error!');
        console.log(e);
      });

    };

    console.clear();

    if( $state.$current.name.indexOf('vitaminas') === 0 || $state.$current.name.indexOf('higiene') === 0 ) {
      $scope.calificable = 0;
    } else {
      $scope.calificable = -1;
    }

  }]);