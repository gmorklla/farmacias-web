'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:BarraControl
 * @description
 * # BarraControl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('BarraCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
        $scope.localizaType = function(type) {
            $rootScope.ubicaType = type;
            $state.go('localiza');
        };
    }]);
