'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:NuevosSideCtrl
 * @description
 * # NuevosSideCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('NuevosSideCtrl', ['$scope', '$filter', 'busqueda', 'prettyUrlSpc', 'LoadMedsSrv', '_', function($scope, $filter, busqueda, prettyUrlSpc, LoadMedsSrv, _) {

        var medicamentos = busqueda.buscaPredictiva(prettyUrlSpc.deconfig('nuevo'));;

        medicamentos.then(function(datos) {

            $scope.searchResult = _.reject(JSON.parse(datos.data.d), function(obj) {
                if (obj.urlImagen == 0) {
                    return obj;
                }
            });

            var faltan = JSON.parse(datos.data.d).length - $scope.searchResult.length;

            console.log("Total = " + JSON.parse(datos.data.d).length);
            console.log("Sin imagen = " + faltan);

            //$scope.searchResult = JSON.parse(datos.data.d);

        }, function(e) {
            for (var key in e) {
                console.log(key + ' ', e[key]);
            }
        });

        $scope.transUrl = function(args) {
            return prettyUrlSpc.prettyUrl(args);
        };
    }]);
