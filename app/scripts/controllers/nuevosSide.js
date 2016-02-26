'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:NuevosSideCtrl
 * @description
 * # NuevosSideCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('NuevosSideCtrl', ['$scope', '$filter', 'busqueda', 'prettyUrlSpc', 'LoadMedsSrv', function($scope, $filter, busqueda, prettyUrlSpc, LoadMedsSrv) {

            var medicamentos = LoadMedsSrv.httpReq('MEDICAMENTOS');

            medicamentos.then(function(datos) {
                //$scope.searchResult = JSON.parse(datos.data.d);
                $scope.searchResult = $filter('filter')(JSON.parse(datos.data.d), true);
            }, function(e) {
                for (var key in e) {
                    console.log(key + ' ', e[key]);
                }
            });

        $scope.transUrl = function(args) {
            return prettyUrlSpc.prettyUrl(args);
        };
    }]);
