'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:NuevosSideCtrl
 * @description
 * # NuevosSideCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('NuevosSideCtrl', ['$scope', '$log', '$stateParams', '$rootScope', 'busqueda', 'prettyUrlSpc', function($scope, $log, $stateParams, $rootScope, busqueda, prettyUrlSpc) {

        var search = busqueda.buscaPredictiva('nuevos', 32);

        search.then(function(datos) {
            $scope.searchResult = JSON.parse(datos.data.d);
        }, function(e) {
            console.log(e);
        });

        $scope.transUrl = function(args) {
            return prettyUrlSpc.prettyUrl(args);
        };
    }]);
