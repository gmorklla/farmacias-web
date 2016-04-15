'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:BarraControl
 * @description
 * # BarraControl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('CalidadCtrl', ['banner', function(banner) {
    	banner.random();
    }]);
