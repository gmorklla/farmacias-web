'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:BarraControl
 * @description
 * # BarraControl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('BarraCtrl', ['loadImg', '$scope', '$rootScope', '$state', function(loadImg, $scope, $rootScope, $state) {
        var imagenesBarra = ['analisis_icon.png', 'consultorios_medicos_icon.png', 'consultorios_icon.png'];
        loadImg.loadImgs($('.loadImgBarra'), imagenesBarra);
        $scope.localizaType = function(type) {
            $rootScope.ubicaType = type;
            $state.go('localiza');
        };
    }]);
